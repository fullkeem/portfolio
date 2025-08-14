'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Portfolio } from '@/types';
import { PortfolioImage } from '@/components/ui/OptimizedImage';

interface Props {
  items: Portfolio[];
}

export function PortfolioSection({ items }: Props) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={false}
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
          {items.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02] hover:shadow-lg">
                {/* 전체 카드 클릭 영역을 오버레이 앵커로 제공 (버튼과 중첩되지 않게 z-index 분리) */}
                <Link
                  href={`/portfolio/${portfolio.id}`}
                  aria-label={`${portfolio.title} 상세 보기`}
                  className="absolute inset-0 z-0"
                />

                <div className="relative z-10">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <PortfolioImage
                      src={portfolio.thumbnail || '/images/placeholder.jpg'}
                      alt={portfolio.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      useProxy={false}
                    />
                    {portfolio.featured && (
                      <div className="absolute right-4 top-4 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                        Featured
                      </div>
                    )}
                  </div>

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

                    <div className="flex gap-2">
                      {portfolio.githubUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              portfolio.githubUrl as string,
                              '_blank',
                              'noopener,noreferrer'
                            );
                          }}
                          className="rounded-md bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-secondary/80"
                          aria-label="GitHub 저장소 열기"
                        >
                          GitHub
                        </button>
                      )}
                      {portfolio.liveUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              portfolio.liveUrl as string,
                              '_blank',
                              'noopener,noreferrer'
                            );
                          }}
                          className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
                          aria-label="라이브 사이트 열기"
                        >
                          Live
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
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
