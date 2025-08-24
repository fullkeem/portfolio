import { Suspense } from 'react';
import { Metadata } from 'next';
import { getPortfolios } from '@/lib/notion/client';
import { PortfolioListClient } from '@/components/portfolio/PortfolioListClient';
import type { Portfolio } from '@/types/portfolio';
import { JsonLd } from '@/components/seo/JsonLd';
import PortfolioPageSkeleton from '@/components/portfolio/PortfolioPageSkeleton';

// ISR 설정: 1시간마다 재생성
export const revalidate = 3600; // 1시간

export const metadata: Metadata = {
  title: 'Portfolio | Fullkeem',
  description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
  openGraph: {
    title: 'Portfolio | Fullkeem',
    description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
    type: 'website',
    url: 'https://fullkeem.vercel.app/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Fullkeem',
    description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
  },
};

async function PortfolioContent() {
  const portfolios = await getPortfolios();

  // 타입 변환: Notion Portfolio를 앱 Portfolio 타입으로 변환
  const transformedPortfolios: Portfolio[] = portfolios.map((portfolio) => ({
    ...portfolio,
    published: true, // Notion에서 가져온 것은 이미 published된 것
    order: 0, // 기본값 설정
  }));

  return (
    <>
      <JsonLd
        type="item-list"
        data={{
          listName: 'Portfolio Projects',
          totalItems: transformedPortfolios.length,
          items: transformedPortfolios.map((portfolio) => ({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            url: `/portfolio/${portfolio.id}`,
          })),
        }}
      />
      <PortfolioListClient portfolios={transformedPortfolios} />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioPageSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}
