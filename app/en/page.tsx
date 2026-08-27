import type { Metadata } from 'next';
import { PortfolioDeck } from '@/components/deck/PortfolioDeck';

export const metadata: Metadata = {
  title: 'Developer & Project Execution Mentor',
  description: 'Kim Choongman is a freelance frontend developer and project execution mentor helping teams turn rough ideas into products they can ship.',
  alternates: {
    canonical: '/en',
    languages: { ko: '/', en: '/en' },
  },
  openGraph: { locale: 'en_US' },
};

export default function EnglishHomePage() {
  return <PortfolioDeck locale="en" />;
}
