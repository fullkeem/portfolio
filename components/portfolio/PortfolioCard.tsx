'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { Portfolio } from '@/types';
import { Github, ExternalLink } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const handleExternalLink = useCallback((url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-background"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/portfolio/${portfolio.id}`} className="flex h-full flex-col">
        {/* 썸네일 */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {portfolio.thumbnail ? (
            <Image
              src={portfolio.thumbnail}
              alt={portfolio.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          )}

          {/* 호버시 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-medium text-white">자세히 보기</span>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 line-clamp-1 text-xl font-semibold transition-colors group-hover:text-primary">
            {portfolio.title}
          </h3>

          <p className="mb-4 line-clamp-2 flex-1 text-muted-foreground">{portfolio.description}</p>

          {/* 기술 스택 */}
          <div className="mb-4 flex flex-wrap gap-2">
            {portfolio.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-md bg-secondary px-2 py-1 text-xs">
                {tech}
              </span>
            ))}
            {portfolio.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{portfolio.technologies.length - 4}
              </span>
            )}
          </div>

          {/* 링크들 */}
          <div className="mt-auto flex items-center gap-4">
            {portfolio.githubUrl && (
              <button
                onClick={(e) => handleExternalLink(portfolio.githubUrl!, e)}
                className="rounded text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="GitHub 저장소"
                type="button"
              >
                <Github className="h-5 w-5" />
              </button>
            )}
            {portfolio.liveUrl && (
              <button
                onClick={(e) => handleExternalLink(portfolio.liveUrl!, e)}
                className="rounded text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="라이브 사이트"
                type="button"
              >
                <ExternalLink className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Featured 배지 */}
      {portfolio.featured && (
        <div className="absolute right-4 top-4 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
          Featured
        </div>
      )}
    </motion.article>
  );
}
