'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedBlurDataURL } from '@/lib/blur-placeholder';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  imageType?: 'profile' | 'portfolio' | 'blog' | 'default';
  fallbackSrc?: string;
  containerClassName?: string;
  showLoadingSpinner?: boolean;
  useProxy?: boolean;
  maxRetries?: number;
}

// 이미지 URL을 프록시를 통해 로드하는 함수
function getProxiedImageUrl(src: string): string {
  try {
    const url = new URL(src);
    // AWS S3나 Notion 이미지인 경우에만 프록시 사용
    const needsProxy = url.hostname.includes('amazonaws.com') || url.hostname.includes('notion.so');

    if (needsProxy) {
      return `/api/image-proxy?url=${encodeURIComponent(src)}`;
    }
    return src;
  } catch {
    return src;
  }
}

export function OptimizedImage({
  src,
  alt,
  imageType = 'default',
  fallbackSrc = '/images/placeholder.jpg',
  containerClassName,
  showLoadingSpinner = false,
  useProxy = true,
  maxRetries = 2,
  className,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() =>
    useProxy ? getProxiedImageUrl(src as string) : src
  );
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      console.warn(`Image load error for: ${currentSrc}`, { retryCount, maxRetries });

      // 재시도 로직
      if (retryCount < maxRetries && currentSrc !== fallbackSrc) {
        setRetryCount((prev) => prev + 1);

        // 첫 번째 재시도: 프록시 없이 원본 URL 시도
        if (retryCount === 0 && useProxy && src !== currentSrc) {
          setCurrentSrc(src as string);
          setIsLoading(true);
          return;
        }

        // 두 번째 재시도: 프록시로 다시 시도 (딜레이 추가)
        if (retryCount === 1) {
          setTimeout(() => {
            setCurrentSrc(useProxy ? getProxiedImageUrl(src as string) : (src as string));
            setIsLoading(true);
          }, 1000);
          return;
        }
      }

      // 최종적으로 폴백 이미지 사용
      setHasError(true);
      setIsLoading(false);
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
        setIsLoading(true);
        setRetryCount(0);
      }

      onError?.(event);
    },
    [currentSrc, retryCount, maxRetries, fallbackSrc, useProxy, src, onError]
  );

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        src={currentSrc}
        alt={alt}
        placeholder="blur"
        blurDataURL={getOptimizedBlurDataURL(imageType)}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-all duration-300',
          isLoading && 'scale-105 blur-sm',
          hasError && 'opacity-50',
          className
        )}
        {...props}
      />

      {/* 로딩 스피너 */}
      {showLoadingSpinner && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-xs text-muted-foreground">
              {retryCount > 0 ? `재시도 중... (${retryCount}/${maxRetries})` : '이미지 로딩 중...'}
            </p>
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <svg
              className="mx-auto mb-2 h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">이미지를 불러올 수 없습니다</p>
            <p className="text-xs opacity-70">네트워크 연결을 확인해주세요</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 전문화된 이미지 컴포넌트들
export function ProfileImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="profile" />;
}

export function PortfolioImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="portfolio" />;
}

export function BlogImage(props: Omit<OptimizedImageProps, 'imageType'>) {
  return <OptimizedImage {...props} imageType="blog" showLoadingSpinner={true} />;
}
