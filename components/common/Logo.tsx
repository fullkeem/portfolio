'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  href?: string;
  ariaLabel?: string;
}

const sizeConfig = {
  sm: {
    container: 'h-8 w-8',
    image: { width: 32, height: 32 },
    text: 'text-base',
    spacing: 'ml-2',
  },
  md: {
    container: 'h-10 w-10',
    image: { width: 40, height: 40 },
    text: 'text-xl',
    spacing: 'ml-2',
  },
  lg: {
    container: 'h-12 w-12',
    image: { width: 48, height: 48 },
    text: 'text-2xl',
    spacing: 'ml-3',
  },
  xl: {
    container: 'h-14 w-14',
    image: { width: 56, height: 56 },
    text: 'text-3xl',
    spacing: 'ml-4',
  },
};

export function Logo({
  size = 'md',
  className = '',
  imageClassName = '',
  href,
  ariaLabel = 'fullkeem 홈페이지로 이동',
}: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const config = sizeConfig[size];

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const LogoContent = () => (
    <div className={cn('flex items-center', className)} aria-label={ariaLabel}>
      <div className={cn('relative overflow-hidden rounded-lg', config.container)}>
        {/* 로딩 상태 */}
        {isLoading && !imageError && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-secondary/50">
            <div className="h-3 w-3 rounded-full bg-primary/30"></div>
          </div>
        )}

        {!imageError ? (
          <Image
            src="/images/icon.png"
            alt="fullkeem 로고"
            width={config.image.width}
            height={config.image.height}
            className={cn(
              'h-full w-full object-contain transition-all duration-200 hover:scale-105',
              isLoading ? 'opacity-0' : 'opacity-100',
              imageClassName
            )}
            priority
            quality={95}
            sizes={`${config.image.width}px`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          // 이미지 로딩 실패시 텍스트 fallback
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 font-bold text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-105',
              config.text
            )}
          >
            F
          </div>
        )}
      </div>
    </div>
  );

  // href가 제공되면 Link로 감싸기, 아니면 그냥 div 반환
  if (href) {
    return (
      <a
        href={href}
        className="rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <LogoContent />
      </a>
    );
  }

  return <LogoContent />;
}
