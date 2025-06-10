'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { BlogPost } from '@/types';
import { useFilterStore } from '@/store/filterStore';

// Dynamic imports로 코드 스플리팅
const BlogCard = dynamic(() => import('@/components/blog/BlogCard'), {
  loading: () => (
    <div className="animate-pulse rounded-lg border bg-background p-6">
      <div className="mb-4 aspect-video rounded-lg bg-muted" />
      <div className="mb-4 space-y-2">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-6 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
      </div>
    </div>
  ),
});

const BlogFilters = dynamic(() => import('@/components/blog/BlogFilters'), {
  loading: () => <div className="mb-8 h-24 animate-pulse rounded-lg bg-secondary/50" />,
});

const BlogPagination = dynamic(() => import('@/components/blog/BlogPagination'), {
  loading: () => <div className="mt-12 h-12 animate-pulse rounded-lg bg-secondary/50" />,
});

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedCategory, selectedTags, blogSearchQuery } = useFilterStore();

  // 블로그 포스트 데이터 가져오기
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // 필터링된 블로그 포스트
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // 검색어 필터
      if (blogSearchQuery) {
        const searchLower = blogSearchQuery.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // 카테고리 필터
      if (selectedCategory && selectedCategory !== '전체') {
        if (post.category !== selectedCategory) return false;
      }

      // 태그 필터 (선택된 태그가 있다면)
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some((tag) => post.tags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      return true;
    });
  }, [blogPosts, selectedCategory, selectedTags, blogSearchQuery]);

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // 모든 태그 추출
  const availableTags = useMemo(() => {
    const allTags = blogPosts.flatMap((post) => post.tags);
    return [...new Set(allTags)].sort();
  }, [blogPosts]);

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTags, blogSearchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            개발 경험과 인사이트를 공유합니다
          </p>
        </motion.div>

        {/* 필터 섹션 */}
        <Suspense fallback={<div className="mb-8 h-24 animate-pulse rounded-lg bg-secondary/50" />}>
          <BlogFilters availableTags={availableTags} />
        </Suspense>

        {/* 블로그 포스트 그리드 */}
        <div className="mx-auto max-w-6xl">
          {loading ? (
            // 로딩 스켈레톤
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border bg-background p-6">
                  <div className="mb-4 aspect-video rounded-lg bg-muted" />
                  <div className="mb-4 space-y-2">
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="h-6 w-full rounded bg-muted" />
                    <div className="h-4 w-3/4 rounded bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredPosts.length > 0 ? (
            <>
              {/* 결과 요약 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center text-sm text-muted-foreground"
              >
                총 {filteredPosts.length}개의 포스트
                {totalPages > 1 && (
                  <span>
                    {' '}
                    • 페이지 {currentPage} / {totalPages}
                  </span>
                )}
              </motion.div>

              {/* 포스트 그리드 */}
              <motion.div
                key={currentPage} // 페이지 변경 시 재애니메이션
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {currentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </motion.div>

              {/* 페이지네이션 */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChangeAction={handlePageChange}
                className="mt-12"
              />
            </>
          ) : (
            // 검색 결과 없음
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted/50">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">포스트를 찾을 수 없습니다</h3>
              <p className="text-muted-foreground">
                검색 조건을 확인하거나 다른 키워드로 검색해보세요.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
