import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamic imports로 코드 스플리팅
const AboutHero = dynamic(
  () => import('@/components/about/AboutHero').then((mod) => ({ default: mod.AboutHero })),
  {
    loading: () => (
      <div className="h-screen animate-pulse bg-gradient-to-br from-background via-secondary/20 to-primary/5" />
    ),
  }
);

const AboutProblemSolution = dynamic(
  () =>
    import('@/components/about/AboutProblemSolution').then((mod) => ({
      default: mod.AboutProblemSolution,
    })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-secondary/50" />,
  }
);

const AboutCredibility = dynamic(
  () =>
    import('@/components/about/AboutCredibility').then((mod) => ({
      default: mod.AboutCredibility,
    })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-secondary/50" />,
  }
);

const AboutJourney = dynamic(
  () => import('@/components/about/AboutJourney').then((mod) => ({ default: mod.AboutJourney })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-secondary/50" />,
  }
);

const AboutPhilosophy = dynamic(
  () =>
    import('@/components/about/AboutPhilosophy').then((mod) => ({ default: mod.AboutPhilosophy })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-secondary/50" />,
  }
);

const AboutTestimonials = dynamic(
  () =>
    import('@/components/about/AboutTestimonials').then((mod) => ({
      default: mod.AboutTestimonials,
    })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-secondary/50" />,
  }
);

export const metadata: Metadata = {
  title: 'About | fullkeem',
  description:
    '프론트엔드 개발자 fullkeem의 상세한 소개, 기술 스택, 경력 및 개발 여정을 확인해보세요.',
  openGraph: {
    title: 'About | fullkeem',
    description:
      '프론트엔드 개발자 fullkeem의 상세한 소개, 기술 스택, 경력 및 개발 여정을 확인해보세요.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | fullkeem',
    description:
      '프론트엔드 개발자 fullkeem의 상세한 소개, 기술 스택, 경력 및 개발 여정을 확인해보세요.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="h-screen animate-pulse bg-gradient-to-br from-background via-secondary/20 to-primary/5" />
        }
      >
        <AboutHero />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary/50" />}>
        <AboutProblemSolution />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary/50" />}>
        <AboutCredibility />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary/50" />}>
        <AboutJourney />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary/50" />}>
        <AboutPhilosophy />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary/50" />}>
        <AboutTestimonials />
      </Suspense>
    </main>
  );
}
