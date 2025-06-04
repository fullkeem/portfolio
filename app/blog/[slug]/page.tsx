'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ExternalLink } from 'lucide-react';
import { BlogPost } from '@/types';
import { NotionBlocks } from '@/lib/notion/blocks';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import Comments from '@/components/blog/Comments';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface BlogPostWithContent extends BlogPost {
  content: BlockObjectResponse[];
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

// SEO를 위한 메타데이터 생성 (server component가 아니므로 여기서는 사용하지 않음)
// 추후 app/blog/[slug]/layout.tsx로 이동 고려

export default function BlogDetailPage() {
  const params = useParams();
  const [blogPost, setBlogPost] = useState<BlogPostWithContent | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);
  const [shareSupported, setShareSupported] = useState(false);

  const slug = params.slug as string;

  // 공유 API 지원 확인
  useEffect(() => {
    setShareSupported('share' in navigator);
  }, []);

  // 블로그 포스트와 관련 포스트 가져오기
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // 블로그 포스트 상세 정보 가져오기
        const postResponse = await fetch(`/api/blog/${slug}`);
        if (!postResponse.ok) {
          if (postResponse.status === 404) {
            setError('블로그 포스트를 찾을 수 없습니다.');
          } else {
            setError('블로그 포스트를 불러오는 중 오류가 발생했습니다.');
          }
          return;
        }
        const postData = await postResponse.json();
        setBlogPost(postData);

        // 목차 생성
        if (postData.content) {
          const toc = generateTableOfContents(postData.content);
          setTableOfContents(toc);
        }

        // 관련 포스트 가져오기 (같은 카테고리의 다른 포스트들)
        const relatedResponse = await fetch('/api/blog');
        if (relatedResponse.ok) {
          const allPosts = await relatedResponse.json();
          const related = allPosts
            .filter(
              (post: BlogPost) =>
                post.slug !== slug &&
                (post.category === postData.category ||
                  post.tags.some((tag: string) => postData.tags.includes(tag)))
            )
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('블로그 포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  // 목차 생성 함수
  const generateTableOfContents = (content: BlockObjectResponse[]): TOCItem[] => {
    const toc: TOCItem[] = [];
    content.forEach((block: BlockObjectResponse, index: number) => {
      if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
        const level = parseInt(block.type.split('_')[1]);
        const headingBlock = block as BlockObjectResponse & {
          [key: string]: {
            rich_text?: Array<{ plain_text: string }>;
          };
        };
        const title =
          headingBlock[block.type]?.rich_text?.map((text) => text.plain_text).join('') || '';
        if (title) {
          toc.push({
            id: `heading-${index}`,
            title,
            level,
          });
        }
      }
    });
    return toc;
  };

  // 공유 기능
  const handleShare = async () => {
    if (!blogPost) return;

    if (shareSupported) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // 사용자가 공유를 취소한 경우
        console.log('Share cancelled');
      }
    } else {
      // 클립보드에 URL 복사
      try {
        await navigator.clipboard.writeText(window.location.href);
        // TODO: 토스트 메시지 표시
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  // 목차로 스킵하는 기능
  const skipToContent = () => {
    const contentElement = document.getElementById('main-content');
    contentElement?.focus();
  };

  if (loading) {
    return (
      <main className="min-h-screen py-20 md:py-32" role="main" aria-label="블로그 포스트 로딩 중">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Skip to content 링크 */}
            <Link
              href="#main-content"
              className="sr-only rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
              onClick={skipToContent}
            >
              본문으로 바로가기
            </Link>

            {/* 로딩 스켈레톤 */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-label="로딩 중"
              className="animate-pulse"
            >
              <div className="mb-8 h-6 w-20 rounded bg-muted" />
              <div className="mb-4 h-12 w-3/4 rounded bg-muted" />
              <div className="mb-8 flex gap-4">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-4 w-20 rounded bg-muted" />
                <div className="h-4 w-16 rounded bg-muted" />
              </div>
              <div className="mb-8 aspect-video rounded-lg bg-muted" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-full rounded bg-muted" />
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    );
  }

  if (error || !blogPost) {
    return (
      <main className="min-h-screen py-20 md:py-32" role="main" aria-label="에러 페이지">
        <div className="container mx-auto px-4">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
            role="alert"
            aria-live="polite"
          >
            <div className="mb-8 text-6xl">😔</div>
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              {error || '블로그 포스트를 찾을 수 없습니다.'}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="블로그 목록 페이지로 이동"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              블로그 목록으로 돌아가기
            </Link>
          </motion.section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 md:py-32" role="main" aria-label="블로그 포스트">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Skip to content 링크 */}
          <Link
            href="#main-content"
            className="sr-only rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
            onClick={skipToContent}
          >
            본문으로 바로가기
          </Link>

          {/* 뒤로가기 버튼 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="블로그 목록으로 돌아가기"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>블로그 목록</span>
            </Link>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            {/* 메인 콘텐츠 */}
            <article>
              {/* 헤더 */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {/* 메타 정보 */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {blogPost.category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={blogPost.publishedAt}>{formatDate(blogPost.publishedAt)}</time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadingTime(blogPost.excerpt)}분 읽기</span>
                  </div>
                  {/* 공유 버튼 */}
                  <button
                    onClick={handleShare}
                    className="ml-auto flex items-center gap-1 rounded-md px-3 py-1 transition-colors hover:bg-secondary"
                    aria-label="포스트 공유하기"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">공유</span>
                  </button>
                </div>

                {/* 제목 */}
                <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
                  {blogPost.title}
                </h1>

                {/* 요약 */}
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {blogPost.excerpt}
                </p>

                {/* 태그 */}
                {blogPost.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded bg-secondary px-2 py-1 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.header>

              {/* 커버 이미지 */}
              {blogPost.coverImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={blogPost.coverImage}
                      alt={`${blogPost.title} 커버 이미지`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                </motion.div>
              )}

              {/* 콘텐츠 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                id="main-content"
                tabIndex={-1}
                className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-24"
              >
                <NotionBlocks blocks={blogPost.content} />
              </motion.div>
            </article>

            {/* 사이드바 */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <TableOfContents items={tableOfContents} />
            </aside>
          </div>

          {/* 관련 포스트 */}
          <RelatedPosts
            posts={relatedPosts}
            currentPostSlug={blogPost.slug}
            className="mt-16 border-t pt-16"
          />

          {/* 댓글 */}
          <Comments slug={blogPost.slug} title={blogPost.title} className="mt-16 border-t pt-16" />
        </div>
      </div>
    </main>
  );
}
