import type { ComponentType } from 'react';

export const workCategories = ['AX', 'Product', 'Frontend', 'Education'] as const;
export type WorkCategory = (typeof workCategories)[number];

export interface LocalizedText {
  ko: string;
  en: string;
}

export interface WorkMedia {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
}

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
  clientWork?: boolean;
  duration?: LocalizedText;
  liveLabel?: LocalizedText;
  media?: WorkMedia[];
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
