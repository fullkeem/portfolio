import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GitBranch, ExternalLink, ArrowLeft, Calendar } from 'lucide-react';
import { getPortfolioById, getPageContent } from '@/lib/notion/client';
import { NotionBlocks } from '@/lib/notion/blocks';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { formatDate } from '@/lib/utils';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getPortfolioById(resolvedParams.id);

  if (!portfolio) {
    notFound();
  }

  const pageContent = (await getPageContent(resolvedParams.id)) as BlockObjectResponse[];

  return (
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
          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={portfolio.createdAt}>{formatDate(portfolio.createdAt)}</time>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="mb-6 flex flex-wrap gap-2">
            {portfolio.technologies.map((tech) => (
              <span key={tech} className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>

          {/* 링크들 */}
          <div className="flex flex-wrap gap-4">
            {portfolio.liveUrl && (
              <Link
                href={portfolio.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4" />
                라이브 사이트
              </Link>
            )}
            {portfolio.githubUrl && (
              <Link
                href={portfolio.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </Link>
            )}
          </div>
        </header>

        {/* 썸네일 이미지 */}
        {portfolio.thumbnail && (
          <div className="mb-12">
            <Image
              src={portfolio.thumbnail}
              alt={portfolio.title}
              width={1200}
              height={675}
              className="aspect-video w-full rounded-lg object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

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
      images: portfolio.thumbnail ? [{ url: portfolio.thumbnail, width: 1200, height: 630 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: portfolio.title,
      description: portfolio.description,
      images: portfolio.thumbnail ? [portfolio.thumbnail] : [],
    },
  };
}
