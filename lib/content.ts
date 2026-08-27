import { z } from 'zod';
import type { WorkEntry, WorkMeta, WritingEntry, WritingMeta } from '@/types/content';

import Shoong, { metadata as shoongMetadata } from '@/content/work/shoong.mdx';
import MagPlus, { metadata as magPlusMetadata } from '@/content/work/magplus.mdx';
import Seoullette, { metadata as seoulletteMetadata } from '@/content/work/seoullette.mdx';
import AtThePlace, { metadata as atThePlaceMetadata } from '@/content/work/at-the-place.mdx';
import SeojaeCheck, { metadata as seojaeCheckMetadata } from '@/content/work/seojae-check.mdx';
import SeoAeoGeo, { metadata as seoAeoGeoMetadata } from '@/content/writing/seo-aeo-geo.mdx';

const workSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.enum(['AX', 'Product', 'Frontend', 'Education']),
  role: z.string().min(1),
  period: z.string().min(1),
  featured: z.boolean(),
  order: z.number().int(),
  technologies: z.array(z.string().min(1)).min(1),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  accent: z.enum(['cobalt', 'lime', 'orange', 'ink']),
});

const writingSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
  publishedAt: z.string().min(1),
  tags: z.array(z.string().min(1)),
  draft: z.boolean(),
});

function work(metadata: unknown, Content: WorkEntry['Content']): WorkEntry {
  return { metadata: workSchema.parse(metadata) as WorkMeta, Content };
}

function writing(metadata: unknown, Content: WritingEntry['Content']): WritingEntry {
  return { metadata: writingSchema.parse(metadata) as WritingMeta, Content };
}

const workEntries = [
  work(magPlusMetadata, MagPlus),
  work(shoongMetadata, Shoong),
  work(seoulletteMetadata, Seoullette),
  work(atThePlaceMetadata, AtThePlace),
  work(seojaeCheckMetadata, SeojaeCheck),
].sort((a, b) => a.metadata.order - b.metadata.order);

const writingEntries = [writing(seoAeoGeoMetadata, SeoAeoGeo)].filter(
  (entry) => !entry.metadata.draft
);

export function getWorkEntries() {
  return workEntries;
}

export function getFeaturedWork() {
  return workEntries.filter((entry) => entry.metadata.featured);
}

export function getWorkBySlug(slug: string) {
  return workEntries.find((entry) => entry.metadata.slug === slug);
}

export function getWritingEntries() {
  return writingEntries;
}

export function getWritingBySlug(slug: string) {
  return writingEntries.find((entry) => entry.metadata.slug === slug.toLowerCase());
}
