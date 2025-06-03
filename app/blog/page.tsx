'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types';
import { useFilterStore } from '@/store/filterStore';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate, calculateReadingTime } from '@/lib/utils';

const categories = ['전체', '기술 블로그', '튜토리얼', '제작 과정', '개발 일지', '생각정리'];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    selectedCategory,
    selectedTags,
    blogSearchQuery,
    setSelectedCategory,
    setBlogSearchQuery,
    clearBlogFilters,
  } = useFilterStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(blogSearchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // 디바운스된 검색어를 스토어에 업데이트
  useEffect(() => {
    setBlogSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setBlogSearchQuery]);

  // 블로그 포스트 데이터 가져오기
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
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

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== '전체') ||
    selectedTags.length > 0 ||
    blogSearchQuery.length > 0;

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {/* 검색 바 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="블로그 글 검색..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {localSearchQuery && (
                <button
                  onClick={() => setLocalSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* 카테고리 필터 */}
            <div>
              <h3 className="mb-3 text-sm font-medium">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected =
                    selectedCategory === category || (category === '전체' && !selectedCategory);
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === '전체' ? null : category)}
                      className={`rounded-full px-4 py-2 text-sm transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 필터 초기화 */}
            {hasActiveFilters && (
              <button
                onClick={clearBlogFilters}
                className="flex items-center gap-1 self-start text-sm text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                필터 초기화
              </button>
            )}
          </div>
        </motion.div>

        {/* 블로그 포스트 그리드 */}
        <div className="mx-auto max-w-6xl">
          {loading ? (
            // 로딩 스켈레톤
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border bg-background p-6">
                  <div className="mb-4 aspect-video rounded-lg bg-muted" />
                  <div className="mb-4">
                    <div className="inline-block h-4 w-20 rounded bg-muted" />
                    <span className="mx-2 text-xs text-muted-foreground">•</span>
                    <div className="inline-block h-4 w-24 rounded bg-muted" />
                  </div>
                  <div className="mb-2 h-7 w-full rounded bg-muted" />
                  <div className="mb-1 h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-3/4 rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <motion.div
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
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background transition-all hover:bg-secondary/50">
                      {/* 커버 이미지 */}
                      {post.coverImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="flex-1 p-6">
                        {/* 메타 정보 */}
                        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium text-primary">{post.category}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <time>{formatDate(post.publishedAt)}</time>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{calculateReadingTime(post.excerpt)}분</span>
                          </div>
                        </div>

                        {/* 제목 */}
                        <h3 className="mb-2 line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>

                        {/* 요약 */}
                        <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>

                        {/* 태그 */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            // 결과 없음
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="text-lg text-muted-foreground">
                검색 결과가 없습니다. 다른 필터를 시도해보세요.
              </p>
            </motion.div>
          )}
        </div>

        {/* 결과 개수 표시 */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            총 {filteredPosts.length}개의 포스트
          </motion.div>
        )}
      </div>
    </div>
  );
}
