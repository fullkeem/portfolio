'use client';

import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['전체', '기술 블로그', '튜토리얼', '제작 과정', '개발 일지', '생각정리'];

interface FilterState {
  category: string | null;
  tags: string[];
  search: string;
}

interface BlogFiltersProps {
  availableTags: string[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

export default function BlogFilters({
  availableTags,
  filters,
  onFilterChange,
  onClearFilters,
}: BlogFiltersProps) {
  const [showTagFilter, setShowTagFilter] = useState(false);

  const hasActiveFilters =
    (filters.category && filters.category !== '전체') ||
    filters.tags.length > 0 ||
    filters.search.length > 0;

  const handleCategorySelect = (category: string) => {
    onFilterChange({ category: category === '전체' ? null : category });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ tags: newTags });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({ search });
  };

  return (
    <div className="mb-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {/* 검색 바 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="블로그 글 검색..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {filters.search && (
            <button
              onClick={() => handleSearchChange('')}
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
                filters.category === category || (category === '전체' && !filters.category);
              return (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition-all duration-200',
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary hover:bg-secondary/80 hover:shadow-sm'
                  )}
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

            {showTagFilter && (
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = filters.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={cn(
                        'rounded-md px-3 py-1 text-xs transition-all duration-200',
                        isSelected
                          ? 'border border-primary/30 bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 필터 초기화 */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 self-start rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
          >
            <X className="h-3 w-3" />
            필터 초기화
          </button>
        )}
      </div>
    </div>
  );
}
