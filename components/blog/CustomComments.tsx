'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  MessageCircle,
  Send,
  Heart,
  Reply,
  User,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Comment, CommentFormData } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase/client';

interface CustomCommentsProps {
  slug: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
}

// 개별 댓글 컴포넌트
function CommentItem({ comment, onReply, onLike }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(comment.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-lg border bg-background p-4 hover:bg-secondary/30"
    >
      <div className="flex items-start gap-3">
        {/* 아바타 */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>

        <div className="flex-1 space-y-2">
          {/* 헤더 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{comment.author_name}</span>
            <span className="text-muted-foreground">•</span>
            <time className="text-muted-foreground">
              {new Date(comment.created_at).toLocaleDateString('ko-KR')}
            </time>
            {!comment.is_approved && (
              <span className="flex items-center gap-1 text-xs text-amber-600">
                <Clock className="h-3 w-3" />
                승인 대기중
              </span>
            )}
          </div>

          {/* 내용 */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="leading-relaxed text-foreground/90">{comment.content}</p>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'} `}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes_count + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Reply className="h-4 w-4" />
              <span>답글</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 댓글 작성 폼
function CommentForm({
  onSubmit,
  isLoading,
  replyTo,
  onCancelReply,
}: {
  onSubmit: (data: CommentFormData) => Promise<void>;
  isLoading: boolean;
  replyTo?: string;
  onCancelReply?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const submitComment = async (data: CommentFormData) => {
    await onSubmit({ ...data, reply_to: replyTo });
    reset();
    onCancelReply?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-background p-4"
    >
      {replyTo && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Reply className="h-4 w-4" />
          <span>답글 작성 중</span>
          <button onClick={onCancelReply} className="ml-auto text-primary hover:underline">
            취소
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(submitComment)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="author_name" className="mb-1 block text-sm font-medium">
              이름 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                {...register('author_name', { required: '이름을 입력해주세요' })}
                id="author_name"
                type="text"
                placeholder="홍길동"
                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.author_name && (
              <p className="mt-1 text-xs text-red-500">{errors.author_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="author_email" className="mb-1 block text-sm font-medium">
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                {...register('author_email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요',
                  },
                })}
                id="author_email"
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.author_email && (
              <p className="mt-1 text-xs text-red-500">{errors.author_email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">
            댓글 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('content', {
              required: '댓글 내용을 입력해주세요',
              minLength: { value: 5, message: '최소 5자 이상 입력해주세요' },
            })}
            id="content"
            rows={4}
            placeholder="댓글을 작성해주세요..."
            className="w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>댓글은 검토 후 게시됩니다</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>전송 중...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>댓글 작성</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function CustomComments({ slug }: CustomCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | undefined>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Supabase 설정 확인을 hooks 사용 후에 체크
  const isConfigured = isSupabaseConfigured();

  // 댓글 목록 로드
  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 작성
  const handleSubmitComment = async (data: CommentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, post_slug: slug }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '댓글이 성공적으로 작성되었습니다!' });
        await loadComments();
      } else {
        throw new Error('댓글 작성에 실패했습니다');
      }
    } catch {
      setMessage({ type: 'error', text: '댓글 작성에 실패했습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 좋아요
  const handleLike = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
      await loadComments();
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  // 답글
  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  useEffect(() => {
    if (isConfigured) {
      loadComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isConfigured]);

  // 메시지 자동 숨김
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Supabase 설정이 안되어 있으면 에러 메시지 표시
  if (!isConfigured) {
    return (
      <div className="rounded-lg border bg-secondary/50 p-6 text-center">
        <AlertCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-muted-foreground">댓글 시스템이 설정되지 않았습니다.</p>
        <p className="mt-1 text-sm text-muted-foreground">Supabase 환경변수를 확인해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상태 메시지 */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-2 rounded-lg p-3 ${
              message.type === 'success'
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'border border-red-200 bg-red-50 text-red-700'
            } `}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 댓글 작성 폼 */}
      <CommentForm
        onSubmit={handleSubmitComment}
        isLoading={isSubmitting}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(undefined)}
      />

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/4 rounded bg-secondary"></div>
                    <div className="h-16 rounded bg-secondary"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <AnimatePresence>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onLike={handleLike}
              />
            ))}
          </AnimatePresence>
        ) : (
          <div className="rounded-lg border bg-secondary/20 p-8 text-center">
            <MessageCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
