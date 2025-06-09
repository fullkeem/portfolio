'use client';

import { useEffect } from 'react';
import { shouldPreloadImage } from '@/lib/utils/image';

interface ImagePreloaderProps {
  src: string;
  isLCP?: boolean;
  isAboveFold?: boolean;
  index?: number;
  priority?: 'high' | 'low';
}

/**
 * Next.js 15 최적화된 이미지 preloader
 * 공식 문서 권장사항: priority 속성보다 preload 사용
 */
export function ImagePreloader({
  src,
  isLCP = false,
  isAboveFold = false,
  index = 0,
  priority = 'high',
}: ImagePreloaderProps) {
  useEffect(() => {
    // preload 여부 결정
    if (!shouldPreloadImage(isLCP, isAboveFold, index)) {
      return;
    }

    // 이미 preload된 이미지인지 확인
    const existingPreload = document.querySelector(`link[href="${src}"]`);
    if (existingPreload) {
      return;
    }

    // preload link 생성
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;

    // Next.js 15 권장: fetchpriority 속성 사용
    if (isLCP) {
      link.setAttribute('fetchpriority', 'high');
    } else {
      link.setAttribute('fetchpriority', priority);
    }

    // 이미지 타입 힌트 (성능 최적화)
    if (src.includes('webp')) {
      link.type = 'image/webp';
    } else if (src.includes('avif')) {
      link.type = 'image/avif';
    }

    document.head.appendChild(link);

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [src, isLCP, isAboveFold, index, priority]);

  // 이 컴포넌트는 렌더링하지 않음 (preload만 수행)
  return null;
}

/**
 * 여러 이미지를 한번에 preload하는 컴포넌트
 */
interface MultiImagePreloaderProps {
  images: Array<{
    src: string;
    isLCP?: boolean;
    isAboveFold?: boolean;
    priority?: 'high' | 'low';
  }>;
}

export function MultiImagePreloader({ images }: MultiImagePreloaderProps) {
  return (
    <>
      {images.map((image, index) => (
        <ImagePreloader
          key={image.src}
          src={image.src}
          isLCP={image.isLCP}
          isAboveFold={image.isAboveFold}
          index={index}
          priority={image.priority}
        />
      ))}
    </>
  );
}
