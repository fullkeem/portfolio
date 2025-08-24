'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Portfolio } from '@/types';
import { useState } from 'react';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index?: number;
}

export function PortfolioCard({ portfolio, index = 0 }: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Image Proxy를 통해 이미지 URL 처리
  const getProxiedImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // 이미지 높이를 동적으로 결정하는 함수
  const getImageHeight = (index: number) => {
    const heights = [350, 280, 200, 420, 320, 280, 180]; // 다양한 높이 패턴
    return heights[index % heights.length];
  };

  return (
    <Link href={`/portfolio/${portfolio.id}`} className="image-card group">
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
        {portfolio.thumbnail && !imageError ? (
          <div className="relative overflow-hidden bg-muted">
            {/* 로딩 스켈레톤 */}
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-muted/50" />
            )}
            <Image
              src={getProxiedImageUrl(portfolio.thumbnail)}
              alt={portfolio.title}
              width={280}
              height={getImageHeight(index)}
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                height: 'auto',
                maxHeight: '500px',
                minHeight: '200px',
              }}
            />

            {/* Hover 오버레이 */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* 제목 - 좌측 상단 */}
            <div className="absolute left-4 top-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-semibold leading-tight text-white drop-shadow-lg">
                {portfolio.title}
              </h3>
              {portfolio.projectType && (
                <p className="mt-1 text-sm text-white/80 drop-shadow-md">{portfolio.projectType}</p>
              )}
            </div>

            {/* 자세히 보기 - 우측 하단 */}
            <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium drop-shadow-md">자세히 보기</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="relative flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20"
            style={{ height: `${getImageHeight(index)}px` }}
          >
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
              <p className="text-sm text-muted-foreground">📷</p>
            </div>

            {/* 플레이스홀더에도 호버 효과 추가 */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute left-4 top-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-semibold leading-tight text-white drop-shadow-lg">
                {portfolio.title}
              </h3>
              {portfolio.projectType && (
                <p className="mt-1 text-sm text-white/80 drop-shadow-md">{portfolio.projectType}</p>
              )}
            </div>

            <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium drop-shadow-md">자세히 보기</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
