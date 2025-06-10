'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { optimizeUnsplashUrl, imagePresets } from '@/lib/utils/image';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostSlug: string;
  className?: string;
}

export default function RelatedPosts({
  posts,
  currentPostSlug,
  className = '',
}: RelatedPostsProps) {
  // 현재 포스트를 제외한 관련 포스트들
  const relatedPosts = posts.filter((post) => post.slug !== currentPostSlug).slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className={`${className}`} aria-labelledby="related-posts-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 id="related-posts-heading" className="mb-8 text-2xl font-bold">
          관련 포스트
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full"
                aria-label={`${post.title} 포스트 읽기`}
              >
                <div className="h-full overflow-hidden rounded-lg border bg-background transition-all hover:bg-secondary/50 hover:shadow-lg">
                  {/* 커버 이미지 */}
                  {post.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={
                          post.coverImage.includes('unsplash.com')
                            ? optimizeUnsplashUrl(post.coverImage.trim(), 300, 200, {
                                quality: imagePresets.relatedPost.quality,
                                format: 'auto',
                              })
                            : post.coverImage.trim()
                        }
                        alt={`${post.title} 커버 이미지`}
                        width={300} // 명시적 크기 추가
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={imagePresets.relatedPost.sizes}
                        quality={imagePresets.relatedPost.quality}
                        priority={false} // 관련 포스트는 모두 지연 로딩
                        loading="lazy" // 모든 관련 포스트 이미지 지연 로딩
                      />
                    </div>
                  )}

                  <div className="p-4">
                    {/* 카테고리 */}
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                        {post.category}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{calculateReadingTime(post.excerpt)}분</span>
                      </div>
                    </div>

                    {/* 제목 */}
                    <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>

                    {/* 요약 */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/* 태그 */}
                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="self-center text-xs text-muted-foreground">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* 더 많은 포스트 보기 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="블로그의 모든 포스트 보기"
          >
            더 많은 포스트 보기
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
