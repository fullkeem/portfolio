import type { Metadata } from 'next';
import { ResumeView } from '@/components/pages/ResumePage';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'The web resume of Kim Choongman, a freelance frontend developer and project execution mentor based in Seoul.',
  alternates: { canonical: '/en/resume', languages: { ko: '/resume', en: '/en/resume' } },
};

export default function EnglishResumePage() {
  return <ResumeView locale="en" />;
}
