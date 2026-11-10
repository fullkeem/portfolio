import type { Metadata } from 'next';
import { WritingArchiveView } from '@/components/pages/WritingPages';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on frontend development, AX, product practice, and project mentoring.',
  alternates: { canonical: '/en/writing', languages: { ko: '/writing', en: '/en/writing' } },
};

export default function EnglishWritingPage() {
  return <WritingArchiveView locale="en" />;
}
