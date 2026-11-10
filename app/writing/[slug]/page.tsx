import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WritingDetailView } from '@/components/pages/WritingPages';
import { getWritingBySlug, getWritingEntries } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getWritingEntries().map(({ metadata }) => ({ slug: metadata.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) return {};

  const path = `/writing/${entry.metadata.slug}`;
  return {
    title: entry.metadata.title,
    description: entry.metadata.summary,
    alternates: { canonical: path, languages: { ko: path, en: `/en${path}` } },
  };
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) notFound();

  return <WritingDetailView entry={entry} locale="ko" />;
}
