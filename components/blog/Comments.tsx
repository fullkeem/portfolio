'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Github, Mail, Users } from 'lucide-react';
import GiscusComments from './GiscusComments';
import CustomComments from './CustomComments';

interface CommentsProps {
  slug: string;
  title: string;
  className?: string;
}

type CommentSystem = 'giscus' | 'custom' | 'both';

import CommentsSkeleton from './CommentsSkeleton';

// 댓글 시스템 선택 컴포넌트
function CommentSystemSelector({
  currentSystem,
  onSystemChange,
  stats,
}: {
  currentSystem: CommentSystem;
  onSystemChange: (system: CommentSystem) => void;
  stats: { giscus: number; custom: number };
}) {
  const options = [
    {
      id: 'giscus',
      name: 'GitHub 계정',
      icon: Github,
      description: 'GitHub으로 로그인하여 댓글 작성',
      count: stats.giscus,
      pros: ['기존 GitHub 사용자 편리', '개발자 친화적'],
      cons: ['GitHub 계정 필요'],
    },
    {
      id: 'custom',
      name: '이메일 인증',
      icon: Mail,
      description: '이메일 주소로 간편하게 댓글 작성',
      count: stats.custom,
      pros: ['GitHub 계정 불필요', '빠른 인증'],
      cons: ['이메일 확인 필요'],
    },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>댓글 작성 방법을 선택하세요</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = currentSystem === option.id;

          return (
            <motion.button
              key={option.id}
              onClick={() => onSystemChange(option.id as CommentSystem)}
              className={`relative overflow-hidden rounded-lg border p-4 text-left transition-all hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary ${isSelected ? 'border-primary bg-primary/5' : 'border-border'} `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'} `}
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'} `}
                    >
                      {option.name}
                    </h3>
                    {option.count > 0 && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {option.count}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{option.description}</p>

                  {/* 선택된 시스템의 상세 정보 */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2 border-t pt-3"
                    >
                      <div className="grid gap-2 text-xs">
                        <div>
                          <span className="text-green-600">✓ 장점:</span>
                          <span className="ml-1 text-muted-foreground">
                            {option.pros.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-amber-600">⚠ 참고:</span>
                          <span className="ml-1 text-muted-foreground">
                            {option.cons.join(', ')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="selected-indicator"
                  className="pointer-events-none absolute inset-0 rounded-lg border-2 border-primary"
                  initial={false}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function Comments({ slug, title, className = '' }: CommentsProps) {
  const { theme, systemTheme } = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);
  const [selectedSystem, setSelectedSystem] = useState<CommentSystem>('giscus');
  const [commentStats, setCommentStats] = useState({ giscus: 0, custom: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 현재 테마 결정
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // 댓글 통계 로드 (성능 최적화)
  useEffect(() => {
    const loadCommentStats = async () => {
      try {
        // 병렬로 두 시스템의 댓글 수를 가져옴
        const [giscusStats, customStats] = await Promise.allSettled([
          fetch(`/api/comments/giscus-stats?slug=${slug}`).then((r) => r.json()),
          fetch(`/api/comments/custom-stats?slug=${slug}`).then((r) => r.json()),
        ]);

        setCommentStats({
          giscus: giscusStats.status === 'fulfilled' ? giscusStats.value.count : 0,
          custom: customStats.status === 'fulfilled' ? customStats.value.count : 0,
        });

        // 기본 시스템 선택 로직 (댓글이 더 많은 쪽 우선)
        if (customStats.status === 'fulfilled' && customStats.value.count > 0) {
          setSelectedSystem('custom');
        }
      } catch (error) {
        console.warn('댓글 통계 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCommentStats();
  }, [slug]);

  // 환경변수 검증 (Giscus)
  const giscusConfig = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    mapping: process.env.NEXT_PUBLIC_GISCUS_MAPPING || 'pathname',
  };

  const isGiscusConfigured = giscusConfig.repo && giscusConfig.repoId && giscusConfig.categoryId;

  if (isLoading) {
    return (
      <section className={`${className}`} aria-labelledby="comments-heading">
        <div className="mb-6">
          <h2 id="comments-heading" className="text-2xl font-bold">
            댓글
          </h2>
        </div>
        <CommentsSkeleton />
      </section>
    );
  }

  return (
    <section ref={commentsRef} className={`${className}`} aria-labelledby="comments-heading">
      <div className="mb-6">
        <h2 id="comments-heading" className="flex items-center gap-2 text-2xl font-bold">
          <MessageCircle className="h-6 w-6" />
          댓글
          {commentStats.giscus + commentStats.custom > 0 && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-normal text-primary">
              {commentStats.giscus + commentStats.custom}
            </span>
          )}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          다양한 방법으로 댓글을 남길 수 있습니다. 편한 방법을 선택해주세요.
        </p>
      </div>

      {/* 댓글 시스템 선택기 */}
      <CommentSystemSelector
        currentSystem={selectedSystem}
        onSystemChange={setSelectedSystem}
        stats={commentStats}
      />

      {/* 선택된 댓글 시스템 렌더링 */}
      <div className="rounded-lg border">
        <AnimatePresence mode="wait">
          {selectedSystem === 'giscus' && isGiscusConfigured && (
            <motion.div
              key="giscus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<CommentsSkeleton />}>
                <GiscusComments
                  config={giscusConfig}
                  theme={currentTheme}
                  slug={slug}
                  title={title}
                />
              </Suspense>
            </motion.div>
          )}

          {selectedSystem === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<CommentsSkeleton />}>
                <CustomComments slug={slug} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 설정 오류 처리 */}
        {selectedSystem === 'giscus' && !isGiscusConfigured && (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">
              GitHub 댓글 시스템을 로드할 수 없습니다.
              <button
                onClick={() => setSelectedSystem('custom')}
                className="ml-1 text-primary underline hover:no-underline"
              >
                다른 방법으로 댓글 작성하기
              </button>
            </p>
          </div>
        )}
      </div>

      {/* 성능 최적화를 위한 프리로드 힌트 */}
      <div className="sr-only">
        {selectedSystem !== 'custom' && <link rel="prefetch" href="/api/comments/custom" />}
        {selectedSystem !== 'giscus' && isGiscusConfigured && (
          <link rel="prefetch" href="https://giscus.app/client.js" />
        )}
      </div>
    </section>
  );
}
