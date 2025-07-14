'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Portfolio } from '@/types';

export function PortfolioSection() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios');
        if (!response.ok) throw new Error('Failed to fetch portfolios');
        const data = await response.json();
        setPortfolios(data.slice(0, 3)); // 최대 3개만 표시
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Image Proxy를 통해 이미지 URL 처리
  const getProxiedImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  };

  const handleImageError = (portfolioId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [portfolioId]: true,
    }));
  };

  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="mx-auto h-6 w-96 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video w-full animate-pulse bg-muted" />
                <div className="p-6">
                  <div className="mb-2 h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="mb-2 h-6 w-full animate-pulse rounded bg-muted" />
                  <div className="mb-4 h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mb-4 flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-20 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Portfolio</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${portfolio.id}`}>
                <div className="group h-full cursor-pointer overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02] hover:shadow-lg">
                  {/* 이미지 */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {portfolio.thumbnail && !imageErrors[portfolio.id] ? (
                      <Image
                        src={getProxiedImageUrl(portfolio.thumbnail)}
                        alt={portfolio.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={() => handleImageError(portfolio.id)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                            <svg
                              className="h-8 w-8 text-primary/60"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-muted-foreground">프로젝트 이미지</p>
                        </div>
                      </div>
                    )}

                    {/* Featured 배지 */}
                    {portfolio.featured && (
                      <div className="absolute right-4 top-4 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-6">
                    <div className="mb-2 text-xs font-medium text-primary">
                      {portfolio.projectType || 'Project'}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                      {portfolio.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {portfolio.description}
                    </p>

                    {/* 기술 스택 태그 */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {portfolio.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-md bg-secondary px-2 py-1 text-xs">
                          {tech}
                        </span>
                      ))}
                      {portfolio.technologies.length > 3 && (
                        <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                          +{portfolio.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex gap-2">
                      {portfolio.githubUrl && (
                        <button
                          onClick={(e) => handleExternalLink(portfolio.githubUrl!, e)}
                          className="flex items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-secondary/80"
                          title="GitHub 저장소"
                        >
                          <Github className="h-3 w-3" />
                          GitHub
                        </button>
                      )}
                      {portfolio.liveUrl && (
                        <button
                          onClick={(e) => handleExternalLink(portfolio.liveUrl!, e)}
                          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
                          title="라이브 사이트"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            모든 프로젝트 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
