import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { PortfolioListClient } from '@/components/portfolio/PortfolioListClient';
import { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
  openGraph: {
    title: 'Portfolio | fullkeem',
    description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
  },
  twitter: {
    title: 'Portfolio | fullkeem',
    description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요',
  },
};

async function getPortfoliosData(): Promise<Portfolio[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/portfolios`,
      {
        cache: 'force-cache',
      }
    );
    if (!response.ok) throw new Error('Failed to fetch portfolios');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolios = await getPortfoliosData();

  // 구조화 데이터용 포트폴리오 아이템 변환
  const portfolioItems = portfolios.map((portfolio: Portfolio) => ({
    id: portfolio.id,
    title: portfolio.title,
    description: portfolio.description,
    url: `/portfolio/${portfolio.id}`,
  }));

  return (
    <>
      <JsonLd
        type="item-list"
        data={{
          listName: 'Portfolio Projects',
          items: portfolioItems,
          totalItems: portfolios.length,
          url: '/portfolio',
        }}
      />
      <PortfolioListClient portfolios={portfolios} />
    </>
  );
}
