'use client';

import { useCallback } from 'react';
import { Portfolio } from '@/types';
import { Github, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index?: number;
}

export function PortfolioCard({ portfolio, index = 0 }: PortfolioCardProps) {
  const handleExternalLink = useCallback((url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const actions = [];

  if (portfolio.githubUrl) {
    actions.push({
      icon: <Github className="h-5 w-5" />,
      onClick: (e: React.MouseEvent) => handleExternalLink(portfolio.githubUrl!, e),
      label: 'GitHub 저장소',
    });
  }

  if (portfolio.liveUrl) {
    actions.push({
      icon: <ExternalLink className="h-5 w-5" />,
      onClick: (e: React.MouseEvent) => handleExternalLink(portfolio.liveUrl!, e),
      label: '라이브 사이트',
    });
  }

  return (
    <Card
      title={portfolio.title}
      description={portfolio.description}
      href={`/portfolio/${portfolio.id}`}
      image={portfolio.thumbnail}
      imageAlt={portfolio.title}
      tags={portfolio.technologies}
      featured={portfolio.featured}
      actions={actions}
      index={index}
      priority={index < 2}
      animation={{
        whileHover: { y: -5 },
        transition: { duration: 0.2 },
      }}
    />
  );
}
