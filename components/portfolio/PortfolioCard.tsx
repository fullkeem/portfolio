"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Portfolio } from "@/types";
import { Github, ExternalLink } from "lucide-react";

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-lg bg-background border h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/portfolio/${portfolio.id}`} className="flex flex-col h-full">
        {/* 썸네일 */}
        <div className="aspect-video relative overflow-hidden bg-muted">
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
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium">자세히 보기</span>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {portfolio.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
            {portfolio.description}
          </p>
          
          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {portfolio.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-secondary rounded-md"
              >
                {tech}
              </span>
            ))}
            {portfolio.technologies.length > 4 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{portfolio.technologies.length - 4}
              </span>
            )}
          </div>

          {/* 링크들 */}
          <div className="flex items-center gap-4 mt-auto">
            {portfolio.githubUrl && (
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub 저장소"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {portfolio.liveUrl && (
              <a
                href={portfolio.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="라이브 사이트"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </Link>

      {/* Featured 배지 */}
      {portfolio.featured && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          Featured
        </div>
      )}
    </motion.article>
  );
}
