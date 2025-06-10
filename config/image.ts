/**
 * 이미지 관련 설정
 */

export const imageConfig = {
  // 이미지가 없을 때 대체 이미지를 사용할지 여부
  useFallbackImages: false, // true로 설정하면 카테고리별 대체 이미지 사용

  // 로딩 실패시 재시도 횟수
  maxRetries: 3,

  // 이미지 품질 설정
  quality: {
    high: 90,
    medium: 80,
    low: 60
  },

  // 반응형 이미지 breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1200,
    desktop: 1920
  }
} as const;

export type ImageConfig = typeof imageConfig; 