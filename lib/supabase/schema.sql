-- 댓글 시스템을 위한 Supabase 스키마
-- 실행 순서: comments 테이블 → RLS 정책 → 인덱스 → 함수

-- 1. 댓글 테이블 생성
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_slug TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    reply_to UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    system_type TEXT DEFAULT 'custom' CHECK (system_type IN ('giscus', 'custom')),
    
    -- 제약 조건
    CONSTRAINT comments_content_length CHECK (char_length(content) >= 5 AND char_length(content) <= 1000),
    CONSTRAINT comments_author_name_length CHECK (char_length(author_name) >= 1 AND char_length(author_name) <= 100),
    CONSTRAINT comments_author_email_format CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- 2. 댓글 좋아요 테이블 (IP 기반 중복 방지)
CREATE TABLE IF NOT EXISTS public.comment_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
    ip_address INET NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 동일 IP에서 동일 댓글에 대한 중복 좋아요 방지
    UNIQUE(comment_id, ip_address)
);

-- 3. 스팸 신고 테이블
CREATE TABLE IF NOT EXISTS public.comment_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
    reporter_ip INET NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('spam', 'inappropriate', 'harassment', 'other')),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 동일 IP에서 동일 댓글에 대한 중복 신고 방지
    UNIQUE(comment_id, reporter_ip)
);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_reports ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 생성

-- 댓글 읽기: 승인된 댓글만 공개적으로 읽기 가능
CREATE POLICY "Anyone can read approved comments" ON public.comments
    FOR SELECT USING (is_approved = TRUE AND is_deleted = FALSE);

-- 댓글 작성: 누구나 작성 가능 (승인 대기 상태로)
CREATE POLICY "Anyone can insert comments" ON public.comments
    FOR INSERT WITH CHECK (is_approved = FALSE AND is_deleted = FALSE);

-- 댓글 수정: 작성자 이메일이 같은 경우만 (간단한 인증)
CREATE POLICY "Authors can update their comments" ON public.comments
    FOR UPDATE USING (author_email = current_setting('request.jwt.claims', true)::json->>'email');

-- 좋아요: 누구나 추가 가능
CREATE POLICY "Anyone can like comments" ON public.comment_likes
    FOR INSERT WITH CHECK (TRUE);

-- 좋아요 읽기: 모든 좋아요 공개적으로 읽기 가능
CREATE POLICY "Anyone can read likes" ON public.comment_likes
    FOR SELECT USING (TRUE);

-- 신고: 누구나 신고 가능
CREATE POLICY "Anyone can report comments" ON public.comment_reports
    FOR INSERT WITH CHECK (TRUE);

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON public.comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON public.comments(is_approved, is_deleted);
CREATE INDEX IF NOT EXISTS idx_comments_reply_to ON public.comments(reply_to);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON public.comment_likes(comment_id);

-- 7. 자동 updated_at 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. updated_at 트리거
DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 9. 좋아요 수 자동 계산 함수
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.comments 
        SET likes_count = likes_count + 1 
        WHERE id = NEW.comment_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.comments 
        SET likes_count = GREATEST(likes_count - 1, 0)
        WHERE id = OLD.comment_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- 10. 좋아요 수 자동 업데이트 트리거
DROP TRIGGER IF EXISTS trigger_update_likes_count ON public.comment_likes;
CREATE TRIGGER trigger_update_likes_count
    AFTER INSERT OR DELETE ON public.comment_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_likes_count();

-- 11. 유용한 뷰 생성

-- 댓글 통계 뷰
CREATE OR REPLACE VIEW public.comment_stats AS
SELECT 
    post_slug,
    COUNT(*) as total_comments,
    COUNT(*) FILTER (WHERE system_type = 'custom') as custom_comments,
    COUNT(*) FILTER (WHERE system_type = 'giscus') as giscus_comments,
    MAX(created_at) as last_activity
FROM public.comments 
WHERE is_approved = TRUE AND is_deleted = FALSE
GROUP BY post_slug;

-- 댓글 + 답글 수 뷰 (계층형)
CREATE OR REPLACE VIEW public.comment_with_replies AS
SELECT 
    c.*,
    COALESCE(r.reply_count, 0) as reply_count
FROM public.comments c
LEFT JOIN (
    SELECT 
        reply_to,
        COUNT(*) as reply_count
    FROM public.comments 
    WHERE reply_to IS NOT NULL AND is_approved = TRUE AND is_deleted = FALSE
    GROUP BY reply_to
) r ON c.id = r.reply_to
WHERE c.is_approved = TRUE AND c.is_deleted = FALSE
ORDER BY c.created_at DESC;

-- 12. 함수: 댓글 작성 (유효성 검사 포함)
CREATE OR REPLACE FUNCTION public.create_comment(
    p_post_slug TEXT,
    p_author_name TEXT,
    p_author_email TEXT,
    p_content TEXT,
    p_reply_to UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_comment_id UUID;
BEGIN
    -- 입력값 검증
    IF char_length(p_content) < 5 OR char_length(p_content) > 1000 THEN
        RAISE EXCEPTION 'Content must be between 5 and 1000 characters';
    END IF;
    
    IF char_length(p_author_name) < 1 OR char_length(p_author_name) > 100 THEN
        RAISE EXCEPTION 'Author name must be between 1 and 100 characters';
    END IF;
    
    IF p_author_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    
    -- 댓글 삽입
    INSERT INTO public.comments (
        post_slug, author_name, author_email, content, reply_to, system_type
    ) VALUES (
        p_post_slug, trim(p_author_name), trim(p_author_email), trim(p_content), p_reply_to, 'custom'
    ) RETURNING id INTO new_comment_id;
    
    RETURN new_comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. 함수: 댓글 좋아요 토글
CREATE OR REPLACE FUNCTION public.toggle_comment_like(
    p_comment_id UUID,
    p_ip_address INET
)
RETURNS BOOLEAN AS $$
DECLARE
    like_exists BOOLEAN;
BEGIN
    -- 기존 좋아요 확인
    SELECT EXISTS(
        SELECT 1 FROM public.comment_likes 
        WHERE comment_id = p_comment_id AND ip_address = p_ip_address
    ) INTO like_exists;
    
    IF like_exists THEN
        -- 좋아요 제거
        DELETE FROM public.comment_likes 
        WHERE comment_id = p_comment_id AND ip_address = p_ip_address;
        RETURN FALSE;
    ELSE
        -- 좋아요 추가
        INSERT INTO public.comment_likes (comment_id, ip_address) 
        VALUES (p_comment_id, p_ip_address);
        RETURN TRUE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. 관리자용 함수: 댓글 승인
CREATE OR REPLACE FUNCTION public.approve_comment(p_comment_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.comments 
    SET is_approved = TRUE, updated_at = NOW()
    WHERE id = p_comment_id AND is_deleted = FALSE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 15. 관리자용 함수: 댓글 삭제 (소프트 삭제)
CREATE OR REPLACE FUNCTION public.delete_comment(p_comment_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.comments 
    SET is_deleted = TRUE, updated_at = NOW()
    WHERE id = p_comment_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 완료 메시지
DO $$
BEGIN
    RAISE NOTICE '댓글 시스템 데이터베이스 스키마가 성공적으로 생성되었습니다!';
    RAISE NOTICE '- 테이블: comments, comment_likes, comment_reports';
    RAISE NOTICE '- RLS 정책: 보안 및 권한 관리';
    RAISE NOTICE '- 인덱스: 성능 최적화';
    RAISE NOTICE '- 함수: 댓글 CRUD 및 좋아요 기능';
    RAISE NOTICE '- 뷰: 통계 및 계층형 댓글 조회';
END $$; 