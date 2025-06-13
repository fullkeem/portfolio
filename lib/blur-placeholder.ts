// Base64로 인코딩된 작은 blur 이미지 생성
export function generateBlurDataURL(width: number = 8, height: number = 8): string {
  // SVG blur placeholder 생성
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `;

  // Base64로 인코딩
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// 색상 기반 blur placeholder 생성
export function generateColorBlurDataURL(color: string = '#f3f4f6'): string {
  const svg = `
    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// 그라디언트 blur placeholder 생성
export function generateGradientBlurDataURL(
  startColor: string = '#f3f4f6',
  endColor: string = '#e5e7eb'
): string {
  const svg = `
    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${startColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${endColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// 이미지 타입별 최적화된 blur placeholder
export function getOptimizedBlurDataURL(imageType?: 'profile' | 'portfolio' | 'blog' | 'default'): string {
  switch (imageType) {
    case 'profile':
      return generateGradientBlurDataURL('#3b82f6', '#1d4ed8'); // 파란색 그라디언트
    case 'portfolio':
      return generateGradientBlurDataURL('#10b981', '#059669'); // 초록색 그라디언트
    case 'blog':
      return generateGradientBlurDataURL('#f59e0b', '#d97706'); // 주황색 그라디언트
    default:
      return generateBlurDataURL();
  }
}

// 실제 이미지에서 blur placeholder 생성 (서버 사이드에서 사용)
export async function generateBlurFromImage(): Promise<string> {
  try {
    // 실제 구현에서는 sharp 라이브러리를 사용하여 이미지를 작게 리사이즈하고 blur 처리
    // 여기서는 기본 placeholder 반환
    return generateBlurDataURL();
  } catch (error) {
    console.error('Failed to generate blur from image:', error);
    return generateBlurDataURL();
  }
} 