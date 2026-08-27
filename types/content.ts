import type { ComponentType } from 'react';

export const workCategories = ['AX', 'Product', 'Frontend', 'Education'] as const;
export type WorkCategory = (typeof workCategories)[number];

export interface WorkMeta {
  slug: string;
  title: string;
  summary: string;
  category: WorkCategory;
  role: string;
  period: string;
  featured: boolean;
  order: number;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: 'cobalt' | 'lime' | 'orange' | 'ink';
}

export interface WritingMeta {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  tags: string[];
  draft: boolean;
}

export interface WorkEntry {
  metadata: WorkMeta;
  Content: ComponentType;
}

export interface WritingEntry {
  metadata: WritingMeta;
  Content: ComponentType;
}
