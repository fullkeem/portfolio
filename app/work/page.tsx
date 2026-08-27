import type { Metadata } from 'next';
import { WorkArchivePage } from '@/components/pages/WorkArchivePage';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Fullkeem이 만든 제품과 프론트엔드 프로젝트를 케이스 스터디로 살펴봅니다.',
  alternates: { canonical: '/work', languages: { ko: '/work', en: '/en/work' } },
};

export default function WorkPage() {
  return <WorkArchivePage locale="ko" />;
}
