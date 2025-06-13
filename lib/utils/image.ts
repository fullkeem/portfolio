/**
 * Next.js 15 + React 19 최적화된 이미지 유틸리티
 * 공식 문서 권장사항 기반
 */

// DPR 2x 제한 (Twitter 사례 참조 - 33% 성능 개선)
const MAX_DPR = 2;

// Next.js 15 최적화된 이미지 크기
export const imageSizes = {
  // 모바일 우선 크기 (Core Web Vitals 최적화)
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// 성능 최적화된 이미지 프리셋
export const imagePresets = {
  // LCP 최적화 - 히어로 이미지
  hero: {
    sizes: '100vw',
    quality: 85,
    priority: false, // preload로 대체
    loading: 'eager' as const,
  },
  // 포트폴리오 카드 - 균형잡힌 품질
  portfolioCard: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 80,
    priority: false,
    loading: 'lazy' as const,
  },
  // 블로그 카드 - 작은 크기
  blogCard: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 75,
    priority: false,
    loading: 'lazy' as const,
  },
  // 블로그 커버 - 빠른 로딩
  blogCover: {
    sizes: '(max-width: 768px) 100vw, 50vw',
    quality: 75,
    priority: false,
    loading: 'lazy' as const,
  },
  // 관련 포스트 - 작은 크기
  relatedPost: {
    sizes: '(max-width: 768px) 50vw, 25vw',
    quality: 70,
    priority: false,
    loading: 'lazy' as const,
  },
} as const;

/**
 * Next.js 15 최적화된 Unsplash URL 생성
 * DPR 2x 제한 및 불필요한 파라미터 제거
 */
export function optimizeUnsplashUrl(
  url: string,
  width: number,
  height?: number,
  options: {
    quality?: number;
    format?: 'auto' | 'webp' | 'avif';
    fit?: 'crop' | 'fill' | 'scale';
  } = {}
): string {
  if (!url || !url.includes('unsplash.com')) {
    return url.trim(); // 공백 제거
  }

  // URL 앞뒤 공백 제거
  url = url.trim();

  const { quality = 80, format = 'auto', fit = 'crop' } = options;

  // DPR 2x 제한 적용 (성능 최적화)
  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    MAX_DPR
  );

  const optimizedWidth = Math.round(width * dpr);
  const optimizedHeight = height ? Math.round(height * dpr) : undefined;

  // URL 파라미터 최적화
  const params = new URLSearchParams();
  params.set('w', optimizedWidth.toString());
  if (optimizedHeight) {
    params.set('h', optimizedHeight.toString());
  }
  params.set('q', quality.toString());
  params.set('fm', format);
  params.set('fit', fit);

  // 불필요한 파라미터 제거된 깔끔한 URL
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Next.js 15 responsive 이미지 크기 생성
 * 더 효율적인 breakpoint 계산
 */
export function generateResponsiveSizes(
  baseWidth: number,
  aspectRatio: number = 1,
  preset: keyof typeof imagePresets = 'portfolioCard'
): {
  srcSet: string;
  sizes: string;
} {
  const { sizes } = imagePresets[preset];

  // 효율적인 breakpoint 생성 (공식 문서 권장)
  const breakpoints = [
    imageSizes.sm,
    imageSizes.md,
    imageSizes.lg,
    imageSizes.xl,
  ];

  const srcSetEntries = breakpoints
    .filter(width => width <= baseWidth * MAX_DPR)
    .map(width => {
      const height = Math.round(width / aspectRatio);
      return `${optimizeUnsplashUrl('', width, height)} ${width}w`;
    });

  return {
    srcSet: srcSetEntries.join(', '),
    sizes,
  };
}

/**
 * LCP 이미지 preload 여부 결정
 * Next.js 15 공식 권장사항 기반
 */
export function shouldPreloadImage(
  isLCP: boolean,
  isAboveFold: boolean,
  index?: number
): boolean {
  // LCP 이미지이거나 첫 번째 이미지만 preload
  return isLCP || (isAboveFold && (index === 0 || index === undefined));
}

/**
 * 이미지 로딩 전략 결정
 * React 19 최적화 기반
 */
export function getImageLoadingStrategy(
  isLCP: boolean,
  isAboveFold: boolean,
  index: number = 0
): {
  loading: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
} {
  if (isLCP || (isAboveFold && index === 0)) {
    return {
      loading: 'eager',
      fetchPriority: 'high',
      decoding: 'sync', // LCP는 동기 디코딩
    };
  }

  if (isAboveFold && index < 3) {
    return {
      loading: 'eager',
      fetchPriority: 'auto',
      decoding: 'async',
    };
  }

  return {
    loading: 'lazy',
    fetchPriority: 'low',
    decoding: 'async',
  };
}

/**
 * 이미지 품질 자동 조정
 * 네트워크 상태 기반 최적화
 */
export function getOptimalQuality(
  baseQuality: number = 80,
  isLCP: boolean = false
): number {
  // LCP 이미지는 품질 우선
  if (isLCP) {
    return Math.min(baseQuality + 10, 95);
  }

  // 네트워크 상태 확인 (지원되는 경우)
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return Math.max(baseQuality - 20, 50);
    }
    if (connection?.effectiveType === '3g') {
      return Math.max(baseQuality - 10, 60);
    }
  }

  return baseQuality;
}

/**
 * 이미지 메타데이터 추출
 * SEO 및 접근성 최적화
 */
export function extractImageMetadata(imageUrl: string): {
  alt: string;
  title?: string;
  description?: string;
} {
  // Unsplash URL에서 메타데이터 추출
  if (imageUrl.includes('unsplash.com')) {
    const urlParts = imageUrl.split('/');
    const photoId = urlParts[urlParts.length - 1]?.split('?')[0];
    return {
      alt: `High-quality image from Unsplash (${photoId})`,
      title: 'Optimized image for better performance',
    };
  }

  return {
    alt: 'Optimized image',
  };
}

// 기존 호환성을 위한 기본 이미지 설정
export const defaultImages = {
  tech: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
  development: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  blog: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
} as const;

export function getDefaultImageByCategory(category: string): string {
  const categoryMap: Record<string, keyof typeof defaultImages> = {
    tech: 'tech',
    technology: 'tech',
    design: 'design',
    ui: 'design',
    ux: 'design',
    development: 'development',
    coding: 'development',
    programming: 'development',
    blog: 'blog',
    article: 'blog',
  };

  const imageKey = categoryMap[category.toLowerCase()] || 'tech';
  return defaultImages[imageKey];
}

export function getImageOrFallback(
  image: string | undefined,
  category: string = 'tech'
): string {
  if (image && image.trim()) {
    return image.trim(); // 공백 제거
  }
  return getDefaultImageByCategory(category);
} 