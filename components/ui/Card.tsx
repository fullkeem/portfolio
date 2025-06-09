'use client';

import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { optimizeUnsplashUrl, imagePresets } from '@/lib/utils/image';

interface MetaItem {
  icon: ReactNode;
  text: string;
}

interface ActionButton {
  icon: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  label: string;
}

interface CardProps {
  // 기본 정보
  title: string;
  description: string;
  href?: string;
  image?: string;
  imageAlt?: string;

  // 메타 정보
  metadata?: MetaItem[];
  tags?: string[];
  category?: string;

  // 상태 및 스타일
  featured?: boolean;
  className?: string;
  index?: number;

  // 액션 버튼들
  actions?: ActionButton[];

  // 이미지 우선순위
  priority?: boolean;

  // 애니메이션 설정
  animation?: {
    initial?: Variants | any;
    animate?: Variants | any;
    whileHover?: Variants | any;
    transition?: Transition;
  };
}

export function Card({
  title,
  description,
  href,
  image,
  imageAlt = title,
  metadata = [],
  tags = [],
  category,
  featured = false,
  className = '',
  index = 0,
  actions = [],
  priority = false,
  animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: { y: -5 },
    transition: { duration: 0.2 },
  },
}: CardProps) {
  const cardContent = (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border bg-background transition-all hover:bg-secondary/50 hover:shadow-lg',
        className
      )}
    >
      {/* Featured 배지 */}
      {featured && (
        <div className="absolute right-4 top-4 z-10 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
          Featured
        </div>
      )}

      {/* 이미지 */}
      {image && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={
              image.includes('unsplash.com')
                ? optimizeUnsplashUrl(image.trim(), 400, 300, {
                    quality: imagePresets.blogCard.quality,
                    format: 'auto',
                  })
                : image.trim()
            }
            alt={imageAlt}
            width={400} // 명시적 크기 추가
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={imagePresets.blogCard.sizes}
            quality={imagePresets.blogCard.quality}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
          {/* 호버시 오버레이 */}
          {href && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-medium text-white">자세히 보기</span>
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${!image ? 'justify-center' : ''}`}>
        {/* 메타 정보 */}
        {(metadata.length > 0 || category) && (
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            {category && (
              <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                {category}
              </span>
            )}
            {category && metadata.length > 0 && <span>•</span>}
            {metadata.map((meta, idx) => (
              <div key={idx} className="flex items-center gap-1">
                {meta.icon}
                <span>{meta.text}</span>
                {idx < metadata.length - 1 && <span className="mx-1">•</span>}
              </div>
            ))}
          </div>
        )}

        {/* 제목 */}
        <h3
          className={cn(
            'mb-2 font-semibold transition-colors',
            href ? 'line-clamp-2 group-hover:text-primary' : 'line-clamp-1',
            image ? 'text-xl' : 'text-2xl'
          )}
        >
          {title}
        </h3>

        {/* 설명 */}
        <p
          className={cn(
            'mb-4 flex-1 leading-relaxed text-muted-foreground',
            tags.length > 0
              ? image
                ? 'line-clamp-2'
                : 'line-clamp-3'
              : image
                ? 'line-clamp-3'
                : 'line-clamp-4'
          )}
        >
          {description}
        </p>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* 액션 버튼들 */}
        {actions.length > 0 && (
          <div className="mt-auto flex items-center gap-4">
            {actions.map((action, actionIndex) => (
              <button
                key={actionIndex}
                onClick={action.onClick}
                className="rounded text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={action.label}
                type="button"
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.article
        initial={animation.initial}
        animate={animation.animate}
        whileHover={animation.whileHover}
        transition={{ ...animation.transition, delay: index * 0.1 }}
        className="group"
      >
        <Link href={href}>{cardContent}</Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={animation.initial}
      animate={animation.animate}
      whileHover={animation.whileHover}
      transition={{ ...animation.transition, delay: index * 0.1 }}
      className="group"
    >
      {cardContent}
    </motion.article>
  );
}
