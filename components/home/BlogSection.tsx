'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { BlogCardSkeleton } from '@/components/common/loading/Skeleton';
import { TiltCard } from '@/components/common/MagneticButton';
import {
  optimizeUnsplashUrl,
  imagePresets,
  getImageLoadingStrategy,
  getOptimalQuality,
  extractImageMetadata,
  getImageOrFallback,
} from '@/lib/utils/image';

export function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Blog</h2>
          <p className="text-lg text-muted-foreground">개발 경험과 인사이트를 공유합니다</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // 로딩 스켈레톤
              [...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)
            : posts.map((post, index) => {
                // 이미지 최적화 설정
                const imageSrc = post.coverImage
                  ? optimizeUnsplashUrl(
                      getImageOrFallback(post.coverImage, post.category || 'blog'),
                      400,
                      300,
                      {
                        quality: getOptimalQuality(imagePresets.blogCard.quality, false),
                        format: 'auto',
                      }
                    )
                  : null;

                // 로딩 전략 결정 (블로그는 LCP가 아님)
                const loadingStrategy = getImageLoadingStrategy(
                  false, // LCP 아님
                  index < 3, // 첫 3개는 above fold
                  index
                );

                // 이미지 메타데이터
                const imageMetadata = imageSrc
                  ? extractImageMetadata(imageSrc)
                  : { alt: post.title };

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <TiltCard
                        className="group relative h-full cursor-pointer overflow-hidden rounded-lg border bg-background"
                        tiltStrength={8}
                      >
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          {imageSrc ? (
                            <Image
                              src={imageSrc?.trim() || ''}
                              alt={imageMetadata.alt}
                              title={imageMetadata.title}
                              width={400} // 명시적 크기 추가
                              height={300}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes={imagePresets.blogCard.sizes}
                              quality={getOptimalQuality(imagePresets.blogCard.quality, false)}
                              loading={loadingStrategy.loading}
                              // @ts-ignore - Next.js 15 새로운 속성
                              fetchPriority={loadingStrategy.fetchPriority}
                              decoding={loadingStrategy.decoding}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                          )}
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>
                        <div className="relative z-10 p-6">
                          <div className="mb-2 text-xs font-medium text-primary">
                            {post.category || 'Blog'}
                          </div>
                          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
                            <span>5분 읽기</span>
                          </div>
                        </div>

                        {/* Hover overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </TiltCard>
                    </Link>
                  </motion.div>
                );
              })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-base font-medium transition-colors hover:bg-secondary"
          >
            모든 글 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
