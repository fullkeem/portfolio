'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Portfolio } from '@/types';
import { Github, ExternalLink } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link href={`/portfolio/${portfolio.id}`}>
      <div className="group h-full cursor-pointer overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02] hover:shadow-lg">
        {/* 이미지 */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {portfolio.thumbnail ? (
            <Image
              src={portfolio.thumbnail}
              alt={portfolio.title}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
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
          <p className="mb-4 line-clamp-2 text-muted-foreground">{portfolio.description}</p>

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
          {(portfolio.githubUrl || portfolio.liveUrl) && (
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
          )}
        </div>
      </div>
    </Link>
  );
}
