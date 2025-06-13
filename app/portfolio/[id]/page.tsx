import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GitBranch, ExternalLink, ArrowLeft, Calendar } from 'lucide-react';
import { getPortfolioById, getPageContent } from '@/lib/notion/client';
import type { Portfolio as NotionPortfolio } from '@/lib/notion/client';
import { NotionBlocks } from '@/lib/notion/blocks';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { formatDate } from '@/lib/utils';
import { PortfolioImage } from '@/components/ui/OptimizedImage';
import { JsonLd } from '@/components/seo/JsonLd';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getPortfolioById(resolvedParams.id);

  if (!portfolio) {
    notFound();
  }

  const pageContent = (await getPageContent(resolvedParams.id)) as BlockObjectResponse[];

  // JsonLd용 포트폴리오 데이터 변환
  const portfolioForJsonLd = {
    ...portfolio,
    published: true, // Notion에서 가져온 데이터는 이미 published된 것
    order: 0, // 기본값
  };

  return (
    <>
      <JsonLd type="portfolio" data={{ portfolio: portfolioForJsonLd }} />
      <div className="min-h-screen py-20 md:py-32">
        <article className="container mx-auto max-w-4xl px-4">
          {/* 뒤로가기 버튼 */}
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            포트폴리오로 돌아가기
          </Link>

          {/* 헤더 */}
          <header className="mb-12">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{portfolio.title}</h1>
            <p className="mb-6 text-xl text-muted-foreground">{portfolio.description}</p>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(portfolio.createdAt)}</time>
              </div>

              {/* 외부 링크 */}
              <div className="flex items-center gap-4">
                {portfolio.githubUrl && (
                  <Link
                    href={portfolio.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <GitBranch className="h-4 w-4" />
                    GitHub
                  </Link>
                )}
                {portfolio.liveUrl && (
                  <Link
                    href={portfolio.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          </header>

          {/* 썸네일 이미지 */}
          {portfolio.thumbnail && (
            <PortfolioImage
              src={portfolio.thumbnail}
              alt={portfolio.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              containerClassName="relative mb-12 w-full overflow-hidden rounded-lg [aspect-ratio:16/9] min-h-[300px]"
              showLoadingSpinner={true}
            />
          )}

          {/* 기술 스택 */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">사용 기술</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.technologies.map((tech) => (
                <span key={tech} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Notion 콘텐츠 */}
          <section className="prose prose-lg max-w-none dark:prose-invert">
            <NotionBlocks blocks={pageContent} />
          </section>

          {/* 하단 네비게이션 */}
          <nav className="mt-16 border-t pt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              다른 프로젝트 보기
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  const { getPortfolios } = await import('@/lib/notion/client');
  const portfolios = await getPortfolios();

  return portfolios.map((portfolio) => ({
    id: portfolio.id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getPortfolioById(resolvedParams.id);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  return {
    title: `${portfolio.title} | Portfolio`,
    description: portfolio.description,
    openGraph: {
      title: portfolio.title,
      description: portfolio.description,
      images: portfolio.thumbnail ? [portfolio.thumbnail] : [],
    },
  };
}
