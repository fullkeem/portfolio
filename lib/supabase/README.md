# Supabase 데이터베이스 스키마

## 파일 구조

- `schema.sql` - 전체 데이터베이스 스키마 (최신 상태)
- `client.ts` - Supabase 클라이언트 설정
- `comments.ts` - 댓글 서비스 로직

## 스키마 적용 방법

### 새 프로젝트 설정

```bash
# 1. Supabase 프로젝트 생성
# 2. 환경변수 설정 (.env.local)
# 3. 스키마 적용
```

### 스키마 업데이트

```sql
-- Supabase Dashboard > SQL Editor에서 실행
-- 또는 Supabase CLI 사용
```

## 주요 테이블

### comments

- 댓글 기본 정보
- 승인 워크플로우 (is_approved)
- 소프트 삭제 (is_deleted)
- 답글 지원 (reply_to)

### comment_likes

- IP 기반 좋아요 시스템
- 중복 방지

### comment_reports

- 스팸/부적절한 댓글 신고
- IP 기반 중복 신고 방지

## 보안

- Row Level Security (RLS) 활성화
- 승인된 댓글만 공개 조회
- IP 기반 좋아요/신고 제한

## 성능 최적화

- 인덱스: post_slug, created_at, is_approved
- 자동 트리거: updated_at, likes_count
- 뷰: 통계 및 계층형 댓글

## 환경변수

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
