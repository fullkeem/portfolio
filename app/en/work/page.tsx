import type { Metadata } from 'next';
import { WorkArchivePage } from '@/components/pages/WorkArchivePage';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected products and web projects built by Fullkeem.',
  alternates: { canonical: '/en/work', languages: { ko: '/work', en: '/en/work' } },
};

export default function EnglishWorkPage() {
  return <WorkArchivePage locale="en" />;
}
