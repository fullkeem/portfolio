import type { Metadata } from 'next';
import { ResumeView } from '@/components/pages/ResumePage';

export const metadata: Metadata = {
  title: 'Resume',
  description: '프리랜서 개발자이자 기업교육·PBL·해커톤 멘토로 활동하는 김충만의 웹 이력서.',
  alternates: { canonical: '/resume', languages: { ko: '/resume', en: '/en/resume' } },
};

export default function ResumePage() {
  return <ResumeView locale="ko" />;
}
