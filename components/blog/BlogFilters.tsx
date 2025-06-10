'use client';

import { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilterStore } from '@/store/filterStore';
import { useDebounce } from '@/hooks/useDebounce';

const categories = ['전체', '기술 블로그', '튜토리얼', '제작 과정', '개발 일지', '생각정리'];

interface BlogFiltersProps {
  availableTags?: string[];
}

export default function BlogFilters({ availableTags = [] }: BlogFiltersProps) {
  const {
    selectedCategory,
    selectedTags,
    blogSearchQuery,
    setSelectedCategory,
    toggleBlogTag,
    setBlogSearchQuery,
    clearBlogFilters,
  } = useFilterStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(blogSearchQuery);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // 디바운스된 검색어를 스토어에 업데이트
  useEffect(() => {
    setBlogSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setBlogSearchQuery]);

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== '전체') ||
    selectedTags.length > 0 ||
    blogSearchQuery.length > 0;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === '전체' ? null : category);
  };

  const handleTagToggle = (tag: string) => {
    toggleBlogTag(tag);
  };

  return (
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
            className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {localSearchQuery && (
            <button
              onClick={() => setLocalSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
                  onClick={() => handleCategorySelect(category)}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary hover:bg-secondary/80 hover:shadow-sm'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 태그 필터 */}
        {availableTags.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">태그</h3>
              <button
                onClick={() => setShowTagFilter(!showTagFilter)}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Filter className="h-3 w-3" />
                {showTagFilter ? '숨기기' : '더보기'}
              </button>
            </div>

            <AnimatePresence>
              {showTagFilter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`rounded-md px-3 py-1 text-xs transition-all duration-200 ${
                            isSelected
                              ? 'border border-primary/30 bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 필터 초기화 */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={clearBlogFilters}
              className="flex items-center gap-1 self-start rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
            >
              <X className="h-3 w-3" />
              필터 초기화
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
