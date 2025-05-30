'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '@/types';
import { NotionBlocks } from '@/lib/notion/blocks';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface BlogPostWithContent extends BlogPost {
  content: any[];
}

// SEO를 위한 메타데이터 생성 (server component가 아니므로 여기서는 사용하지 않음)
// 추후 app/blog/[slug]/layout.tsx로 이동 고려

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPostWithContent | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; title: string; level: number }[]
  >([]);

  const slug = params.slug as string;

  // 블로그 포스트와 관련 포스트 가져오기
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching blog post:', error);
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
  const generateTableOfContents = (content: any[]) => {
    const toc: { id: string; title: string; level: number }[] = [];
    content.forEach((block: any, index: number) => {
      if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
        const level = parseInt(block.type.split('_')[1]);
        const title =
          block[block.type]?.rich_text?.map((text: any) => text.plain_text).join('') || '';
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
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href);
      // TODO: 토스트 메시지 표시
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
            <section aria-label="로딩 중" className="animate-pulse">
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
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (error || !blogPost) {
    return (
      <main className="min-h-screen py-20 md:py-32" role="main" aria-label="에러 페이지">
        <div className="container mx-auto px-4">
          <section className="mx-auto max-w-4xl text-center" role="alert" aria-live="polite">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              {error || '블로그 포스트를 찾을 수 없습니다.'}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="블로그 목록 페이지로 이동"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              블로그 목록으로 돌아가기
            </Link>
          </section>
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

          {/* 뒤로 가기 네비게이션 */}
          <nav role="navigation" aria-label="브레드크럼">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="블로그 목록으로 돌아가기"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                블로그 목록
              </Link>
            </motion.div>
          </nav>

          {/* 블로그 포스트 아티클 */}
          <article role="article" aria-labelledby="post-title">
            {/* 헤더 섹션 */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
              role="banner"
            >
              {/* 카테고리 */}
              <div className="mb-4">
                <span
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  role="badge"
                  aria-label={`카테고리: ${blogPost.category}`}
                >
                  {blogPost.category}
                </span>
              </div>

              {/* 제목 */}
              <h1 id="post-title" className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                {blogPost.title}
              </h1>

              {/* 메타 정보 */}
              <div
                className="mb-6 flex flex-wrap items-center gap-4 text-muted-foreground"
                role="contentinfo"
              >
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time
                    dateTime={blogPost.publishedAt}
                    aria-label={`발행일: ${formatDate(blogPost.publishedAt)}`}
                  >
                    {formatDate(blogPost.publishedAt)}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span
                    aria-label={`예상 읽기 시간: ${calculateReadingTime(
                      blogPost.excerpt +
                        (blogPost.content || [])
                          .map((block: any) => block.plain_text || '')
                          .join(' ')
                    )}분`}
                  >
                    {calculateReadingTime(
                      blogPost.excerpt +
                        (blogPost.content || [])
                          .map((block: any) => block.plain_text || '')
                          .join(' ')
                    )}
                    분 읽기
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 rounded hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="포스트 공유하기"
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  공유하기
                </button>
              </div>

              {/* 태그 */}
              {blogPost.tags.length > 0 && (
                <div
                  className="mb-6 flex flex-wrap items-center gap-2"
                  role="group"
                  aria-label="태그 목록"
                >
                  <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {blogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground"
                      role="badge"
                      aria-label={`태그: ${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 요약 */}
              <p className="text-lg leading-relaxed text-muted-foreground" role="doc-subtitle">
                {blogPost.excerpt}
              </p>
            </motion.header>

            {/* 커버 이미지 */}
            {blogPost.coverImage && (
              <motion.figure
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
                role="img"
                aria-labelledby="cover-image-caption"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={blogPost.coverImage}
                    alt={`${blogPost.title} 커버 이미지`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <figcaption id="cover-image-caption" className="sr-only">
                  {blogPost.title} 포스트의 커버 이미지
                </figcaption>
              </motion.figure>
            )}

            {/* 목차 */}
            {tableOfContents.length > 0 && (
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mb-8 rounded-lg border bg-secondary/30 p-6"
                role="navigation"
                aria-labelledby="toc-heading"
              >
                <h2 id="toc-heading" className="mb-4 text-lg font-semibold">
                  목차
                </h2>
                <ol className="space-y-2" role="list">
                  {tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginLeft: `${(item.level - 1) * 16}px` }}
                      role="listitem"
                    >
                      <Link
                        href={`#${item.id}`}
                        className="rounded text-sm text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`${item.level}단계 제목: ${item.title}로 이동`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </motion.nav>
            )}

            {/* 본문 내용 */}
            <motion.section
              id="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-pre:bg-muted prose-img:rounded-lg"
              role="main"
              aria-label="블로그 포스트 본문"
              tabIndex={-1}
            >
              <NotionBlocks blocks={blogPost.content} />
            </motion.section>
          </article>

          {/* 관련 포스트 */}
          {relatedPosts.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 border-t pt-12"
              role="complementary"
              aria-labelledby="related-posts-heading"
            >
              <h2 id="related-posts-heading" className="mb-8 text-2xl font-bold">
                관련 포스트
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
                {relatedPosts.map((post) => (
                  <article key={post.id} className="group" role="listitem">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`${post.title} 포스트 읽기`}
                    >
                      <div className="overflow-hidden rounded-lg border bg-background transition-all hover:bg-secondary/50">
                        {post.coverImage && (
                          <figure className="relative aspect-video overflow-hidden">
                            <Image
                              src={post.coverImage}
                              alt={`${post.title} 썸네일`}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </figure>
                        )}
                        <div className="p-4">
                          <div className="mb-2 text-xs text-primary" role="badge">
                            {post.category}
                          </div>
                          <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </main>
  );
}
