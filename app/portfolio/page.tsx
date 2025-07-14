import { Suspense } from 'react';
import { Metadata } from 'next';
import { getPortfolios } from '@/lib/notion/client';
import { PortfolioListClient } from '@/components/portfolio/PortfolioListClient';
import type { Portfolio } from '@/types/portfolio';
import { JsonLd } from '@/components/seo/JsonLd';
import { Skeleton } from '@/components/common/loading/Skeleton';

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
          name: 'Portfolio Projects',
          description: '다양한 프로젝트들을 통해 쌓아온 경험과 기술력',
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
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* 헤더 스켈레톤 */}
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-64" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        {/* 필터 스켈레톤 */}
        <div className="mb-8">
          <div className="rounded-lg border bg-background/50 p-4 backdrop-blur md:p-6">
            <Skeleton className="mb-4 h-10 w-full" />
            <div className="mb-3">
              <Skeleton className="mb-3 h-4 w-20" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-16" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 포트폴리오 그리드 스켈레톤 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-background">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6">
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <div className="mb-4 flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
