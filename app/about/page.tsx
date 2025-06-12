import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutProblemSolution } from '@/components/about/AboutProblemSolution';
import { AboutCredibility } from '@/components/about/AboutCredibility';
// import { AboutJourney } from '@/components/about/AboutJourney';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutTestimonials } from '@/components/about/AboutTestimonials';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About',
  description:
    '크몽에서 만나는 신뢰할 수 있는 프론트엔드 개발자 fullkeem. 고객 중심의 소통과 완성도 높은 웹사이트 제작을 약속합니다.',
  openGraph: {
    title: 'About | fullkeem',
    description: '크몽에서 만나는 신뢰할 수 있는 프론트엔드 개발자',
  },
  twitter: {
    title: 'About | fullkeem',
    description: '크몽에서 만나는 신뢰할 수 있는 프론트엔드 개발자',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <JsonLd type="professional-service" />
      <AboutHero />
      <AboutProblemSolution />
      <AboutCredibility />
      {/* <AboutJourney /> */}
      <AboutPhilosophy />
      <AboutTestimonials />
    </div>
  );
}
