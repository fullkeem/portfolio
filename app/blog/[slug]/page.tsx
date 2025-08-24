import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { formatDate } from '@/lib/utils';
import { NotionBlocks } from '@/lib/notion/blocks';
import { getBlogMarkdownBySlug } from '@/lib/notion/markdown';
import { getCachedBlogPostBySlug, getCachedPageContent } from '@/lib/notion/client';
import ContentSkeleton from '@/components/common/loading/ContentSkeleton';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blogPost = await getCachedBlogPostBySlug(resolvedParams.slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 md:py-32">
      <article className="container mx-auto max-w-4xl px-4">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          블로그로 돌아가기
        </Link>

        {/* 헤더 */}
        <header className="mb-12">
          {/* 카테고리 */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Tag className="h-3 w-3" />
              {blogPost.category}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{blogPost.title}</h1>
          <p className="mb-6 text-xl text-muted-foreground">{blogPost.excerpt}</p>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={blogPost.publishedAt}>{formatDate(blogPost.publishedAt)}</time>
            </div>
          </div>

          {/* 태그 */}
          {blogPost.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span key={tag} className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 커버 이미지 */}
        {blogPost.coverImage && (
          <div className="mb-12">
            <Image
              src={blogPost.coverImage}
              alt={blogPost.title}
              width={1200}
              height={675}
              className="aspect-video w-full rounded-lg object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Notion/Markdown 콘텐츠 - 스트리밍 렌더 */}
        <section className="prose prose-lg max-w-none dark:prose-invert">
          <Suspense fallback={<ContentSkeleton />}>
            <ContentSection slug={resolvedParams.slug} id={blogPost.id} />
          </Suspense>
        </section>

        {/* 하단 네비게이션 */}
        <nav className="mt-16 border-t pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            다른 포스트 보기
          </Link>
        </nav>
      </article>
    </div>
  );
}

// 본문을 비동기로 가져와 스트리밍 (Markdown 우선, 없으면 블록)
async function ContentSection({ slug, id }: { slug: string; id: string }) {
  const mdString = await getBlogMarkdownBySlug(slug);
  const useMarkdown = Boolean(mdString && mdString.length > 0);
  if (useMarkdown) {
    return <MarkdownRenderer markdown={mdString!} />;
  }
  const pageContent = (await getCachedPageContent(id)) as BlockObjectResponse[];
  return <NotionBlocks blocks={pageContent} />;
}

// 정적 경로 생성
export async function generateStaticParams() {
  const { getBlogPosts } = await import('@/lib/notion/client');
  const blogPosts = await getBlogPosts();

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 메타데이터 생성 (간소화)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blogPost = await getCachedBlogPostBySlug(resolvedParams.slug);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blogPost.title} | Blog`,
    description: blogPost.excerpt,
    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt,
      images: blogPost.coverImage ? [{ url: blogPost.coverImage, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blogPost.title,
      description: blogPost.excerpt,
      images: blogPost.coverImage ? [blogPost.coverImage] : [],
    },
  };
}
