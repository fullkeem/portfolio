import type { Metadata } from 'next';
import { WritingArchiveView } from '@/components/pages/WritingPages';

export const metadata: Metadata = {
  title: 'Writing',
  description: '웹 개발, AX, 제품과 교육에서 배운 내용을 다시 설명하는 Fullkeem의 글.',
  alternates: { canonical: '/writing', languages: { ko: '/writing', en: '/en/writing' } },
};

export default function WritingPage() {
  return <WritingArchiveView locale="ko" />;
}
