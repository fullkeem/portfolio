'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Portfolio } from '@/types';
import { PortfolioCardSkeleton } from '@/components/common/loading/Skeleton';
import { TiltCard } from '@/components/common/MagneticButton';
import {
  optimizeUnsplashUrl,
  imagePresets,
  getOptimalQuality,
  extractImageMetadata,
  getImageOrFallback,
} from '@/lib/utils/image';
import { ImagePreloader } from '@/components/ui/ImagePreloader';

export function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios');
        const data = await response.json();
        setPortfolios(data.filter((p: Portfolio) => p.featured).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // LCP 이미지 preload를 위한 첫 번째 포트폴리오 이미지 (더 큰 크기로 최적화)
  const firstPortfolio = portfolios[0];
  const firstImageSrc = firstPortfolio?.thumbnail
    ? optimizeUnsplashUrl(getImageOrFallback(firstPortfolio.thumbnail, 'development'), 600, 400, {
        quality: getOptimalQuality(95, true), // LCP 이미지는 높은 품질로
        format: 'webp', // WebP 강제 사용
      })
    : null;

  return (
    <section id="portfolio" className="bg-secondary/20 py-20 md:py-32">
      {/* LCP 이미지 preload - 더 높은 우선순위 */}
      {firstImageSrc && (
        <ImagePreloader src={firstImageSrc} isLCP={true} isAboveFold={true} index={0} />
      )}

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Portfolio</h2>
          <p className="text-lg text-muted-foreground">최근 작업한 프로젝트들을 확인해보세요</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // 로딩 스켈레톤
              [...Array(3)].map((_, i) => <PortfolioCardSkeleton key={i} />)
            : portfolios.map((portfolio, index) => {
                // 이미지 최적화 설정 (첫 번째 이미지는 더 큰 크기와 높은 품질)
                const imageSrc = portfolio.thumbnail
                  ? optimizeUnsplashUrl(
                      getImageOrFallback(portfolio.thumbnail, 'development'),
                      index === 0 ? 600 : 400, // 첫 번째 이미지는 더 큰 크기
                      index === 0 ? 400 : 300,
                      {
                        quality: getOptimalQuality(
                          index === 0 ? 95 : imagePresets.portfolioCard.quality,
                          index === 0
                        ),
                        format: index === 0 ? 'webp' : 'auto', // 첫 번째는 WebP 강제
                      }
                    )
                  : null;

                // 이미지 메타데이터
                const imageMetadata = imageSrc
                  ? extractImageMetadata(imageSrc)
                  : { alt: portfolio.title };

                return (
                  <motion.div
                    key={portfolio.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/portfolio/${portfolio.id}`}>
                      <TiltCard
                        className="group relative h-full cursor-pointer overflow-hidden rounded-lg border bg-background"
                        tiltStrength={12}
                      >
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          {imageSrc ? (
                            <Image
                              src={imageSrc?.trim() || ''}
                              alt={imageMetadata.alt}
                              title={imageMetadata.title}
                              width={400}
                              height={300}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes={imagePresets.portfolioCard.sizes}
                              quality={getOptimalQuality(imagePresets.portfolioCard.quality, false)}
                              loading="lazy"
                              fetchPriority="low"
                              decoding="async"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                          )}
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>
                        <div className="relative z-10 p-6">
                          <div className="mb-2 text-xs font-medium text-primary">
                            {portfolio.projectType || 'Project'}
                          </div>
                          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                            {portfolio.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-muted-foreground">
                            {portfolio.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {portfolio.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-secondary px-2 py-1 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                            {portfolio.technologies.length > 3 && (
                              <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                                +{portfolio.technologies.length - 3}
                              </span>
                            )}
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
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-base font-medium transition-colors hover:bg-secondary"
          >
            모든 프로젝트 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
