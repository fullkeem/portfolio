'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogPagination from '@/components/blog/BlogPagination';
import { BlogPost } from '@/types';

const POSTS_PER_PAGE = 9;

interface BlogListClientProps {
  blogPosts: BlogPost[];
}

interface FilterState {
  category: string | null;
  tags: string[];
  search: string;
}

export function BlogListClient({ blogPosts }: BlogListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    tags: [],
    search: '',
  });

  // 필터링된 블로그 포스트
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // 검색어 필터
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // 카테고리 필터
      if (filters.category && filters.category !== '전체') {
        if (post.category !== filters.category) return false;
      }

      // 태그 필터
      if (filters.tags.length > 0) {
        const hasSelectedTag = filters.tags.some((tag) => post.tags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      return true;
    });
  }, [blogPosts, filters]);

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
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      tags: [],
      search: '',
    });
  };

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            개발 경험과 인사이트를 공유합니다
          </p>
        </div>

        {/* 필터 섹션 */}
        <BlogFilters
          availableTags={availableTags}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        {/* 블로그 포스트 그리드 */}
        <div className="mx-auto max-w-6xl">
          {filteredPosts.length > 0 ? (
            <>
              {/* 결과 요약 */}
              <div className="mb-8 text-center text-sm text-muted-foreground">
                총 {filteredPosts.length}개의 포스트
                {totalPages > 1 && (
                  <span>
                    {' '}
                    • 페이지 {currentPage} / {totalPages}
                  </span>
                )}
              </div>

              {/* 포스트 그리드 */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChangeAction={handlePageChange}
                />
              )}
            </>
          ) : (
            // 결과 없음
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                검색 결과가 없습니다. 다른 필터를 시도해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
