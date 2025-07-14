import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutProblemSolution } from '@/components/about/AboutProblemSolution';
import { AboutCredibility } from '@/components/about/AboutCredibility';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutTestimonials } from '@/components/about/AboutTestimonials';

export const metadata: Metadata = {
  title: 'About - 랜딩페이지 전문가 fullkeem',
  description:
    '매출을 만드는 랜딩페이지 제작 전문가 fullkeem. AEO 설계, AI 자동화, 성능 최적화, 데이터 분석으로 고객의 비즈니스 성장을 함께 만들어갑니다.',
  openGraph: {
    title: 'About - 랜딩페이지 전문가 fullkeem',
    description:
      '매출을 만드는 랜딩페이지 제작 전문가. 비즈니스 파트너로서 실제 성과에 집중합니다.',
  },
  twitter: {
    title: 'About - 랜딩페이지 전문가 fullkeem',
    description:
      '매출을 만드는 랜딩페이지 제작 전문가. 비즈니스 파트너로서 실제 성과에 집중합니다.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutProblemSolution />
      <AboutCredibility />
      <AboutPhilosophy />
      <AboutTestimonials />
    </div>
  );
}
