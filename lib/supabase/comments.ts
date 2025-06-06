import { supabase, isSupabaseConfigured } from './client';
import { Comment, CommentFormData, CommentStats } from '@/types';

// IP 주소 가져오기 유틸리티
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  return '127.0.0.1'; // 개발 환경 기본값
}

// 댓글 서비스 클래스
export class CommentService {
  private static instance: CommentService;

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  // Supabase 연결 확인
  private ensureConnection() {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase가 설정되지 않았습니다');
    }
  }

  // 댓글 목록 조회 (승인된 댓글만)
  async getComments(postSlug: string): Promise<Comment[]> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .from('comments')
      .select('*')
      .eq('post_slug', postSlug)
      .eq('is_approved', true)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('댓글 조회 오류:', error);
      throw new Error('댓글을 불러오는데 실패했습니다');
    }

    return data || [];
  }

  // 댓글 통계 조회
  async getCommentStats(postSlug: string): Promise<CommentStats> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .from('comment_stats')
      .select('*')
      .eq('post_slug', postSlug)
      .single();

    if (error) {
      // 댓글이 없는 경우 기본값 반환
      return {
        giscus_count: 0,
        custom_count: 0,
        total_count: 0
      };
    }

    return {
      giscus_count: data.giscus_comments || 0,
      custom_count: data.custom_comments || 0,
      total_count: data.total_comments || 0,
      last_activity: data.last_activity
    };
  }

  // 댓글 작성
  async createComment(
    commentData: CommentFormData & { post_slug: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _req: Request
  ): Promise<string> {
    this.ensureConnection();

    // Supabase 함수 호출
    const { data, error } = await supabase!
      .rpc('create_comment', {
        p_post_slug: commentData.post_slug,
        p_author_name: commentData.author_name,
        p_author_email: commentData.author_email,
        p_content: commentData.content,
        p_reply_to: commentData.reply_to || null
      });

    if (error) {
      console.error('댓글 작성 오류:', error);
      throw new Error(error.message || '댓글 작성에 실패했습니다');
    }

    return data; // UUID 반환
  }

  // 댓글 좋아요 토글
  async toggleLike(commentId: string, req: Request): Promise<boolean> {
    this.ensureConnection();

    const ipAddress = getClientIP(req);

    const { data, error } = await supabase!
      .rpc('toggle_comment_like', {
        p_comment_id: commentId,
        p_ip_address: ipAddress
      });

    if (error) {
      console.error('좋아요 토글 오류:', error);
      throw new Error('좋아요 처리에 실패했습니다');
    }

    return data; // true: 좋아요 추가, false: 좋아요 제거
  }

  // 댓글 신고
  async reportComment(
    commentId: string,
    reason: 'spam' | 'inappropriate' | 'harassment' | 'other',
    details: string,
    req: Request
  ): Promise<void> {
    this.ensureConnection();

    const ipAddress = getClientIP(req);

    const { error } = await supabase!
      .from('comment_reports')
      .insert({
        comment_id: commentId,
        reporter_ip: ipAddress,
        reason,
        details: details || null
      });

    if (error) {
      if (error.code === '23505') { // 중복 신고
        throw new Error('이미 신고한 댓글입니다');
      }
      console.error('댓글 신고 오류:', error);
      throw new Error('댓글 신고에 실패했습니다');
    }
  }

  // 관리자용: 댓글 승인
  async approveComment(commentId: string): Promise<boolean> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .rpc('approve_comment', {
        p_comment_id: commentId
      });

    if (error) {
      console.error('댓글 승인 오류:', error);
      throw new Error('댓글 승인에 실패했습니다');
    }

    return data;
  }

  // 관리자용: 댓글 삭제
  async deleteComment(commentId: string): Promise<boolean> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .rpc('delete_comment', {
        p_comment_id: commentId
      });

    if (error) {
      console.error('댓글 삭제 오류:', error);
      throw new Error('댓글 삭제에 실패했습니다');
    }

    return data;
  }

  // 관리자용: 미승인 댓글 목록
  async getPendingComments(): Promise<Comment[]> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .from('comments')
      .select('*')
      .eq('is_approved', false)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('미승인 댓글 조회 오류:', error);
      throw new Error('미승인 댓글을 불러오는데 실패했습니다');
    }

    return data || [];
  }

  // 관리자용: 신고된 댓글 목록
  async getReportedComments(): Promise<unknown[]> {
    this.ensureConnection();

    const { data, error } = await supabase!
      .from('comment_reports')
      .select(`
        *,
        comments (
          id,
          post_slug,
          author_name,
          content,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('신고된 댓글 조회 오류:', error);
      throw new Error('신고된 댓글을 불러오는데 실패했습니다');
    }

    return data || [];
  }

  // 실시간 댓글 구독 (WebSocket)
  subscribeToComments(
    postSlug: string,
    callback: (payload: unknown) => void
  ): () => void {
    this.ensureConnection();

    const subscription = supabase!
      .channel(`comments:${postSlug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_slug=eq.${postSlug}`
        },
        callback
      )
      .subscribe();

    // 구독 해제 함수 반환
    return () => {
      subscription.unsubscribe();
    };
  }
}

// 싱글톤 인스턴스 내보내기
export const commentService = CommentService.getInstance(); 