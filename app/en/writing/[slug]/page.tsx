import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WritingDetailView } from '@/components/pages/WritingPages';
import { writingEnglish } from '@/config/localized-content';
import { getWritingBySlug, getWritingEntries } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getWritingEntries().map(({ metadata }) => ({ slug: metadata.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) return {};
  const metadata = writingEnglish[entry.metadata.slug]?.metadata ?? entry.metadata;
  const path = `/writing/${metadata.slug}`;
  return {
    title: metadata.title,
    description: metadata.summary,
    alternates: { canonical: `/en${path}`, languages: { ko: path, en: `/en${path}` } },
  };
}

export default async function EnglishWritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) notFound();
  return <WritingDetailView entry={entry} locale="en" />;
}
