import type { Metadata } from 'next';
import { PortfolioDeck } from '@/components/deck/PortfolioDeck';

export const metadata: Metadata = {
  // absolute: a layout's title.template skips the page in its own segment, so the root's Korean template would apply.
  title: { absolute: 'Developer, AX Tutor/Mentor · Kim Choongman · Fullkeem' },
  description: 'Kim Choongman develops products and teaches teams to apply AI through corporate training, PBL, and hackathon mentoring.',
  alternates: {
    canonical: '/en',
    languages: { ko: '/', en: '/en' },
  },
};

export default function EnglishHomePage() {
  return <PortfolioDeck locale="en" />;
}
