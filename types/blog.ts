export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
}

export type BlogCategory =
  | '기술 블로그'
  | '튜토리얼'
  | '제작 과정'
  | '개발 일지'
  | '생각정리';

export interface BlogFilterState {
  category: BlogCategory | null;
  tags: string[];
  searchQuery: string;
}

// 추가 유틸리티 타입들
export interface BlogPostWithMeta extends BlogPost {
  readingTime: number;
  featured?: boolean;
  published?: boolean;
  viewCount?: number;
}
