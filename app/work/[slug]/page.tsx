import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetailView } from '@/components/pages/WorkDetailPage';
import { getWorkBySlug, getWorkEntries } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getWorkEntries().map(({ metadata }) => ({ slug: metadata.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};

  const path = `/work/${entry.metadata.slug}`;
  return {
    title: entry.metadata.title,
    description: entry.metadata.summary,
    alternates: { canonical: path, languages: { ko: path, en: `/en${path}` } },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  return <WorkDetailView entry={entry} locale="ko" />;
}
