'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { useDebounce } from '@/hooks/useDebounce';

interface PortfolioFilterProps {
  technologies: string[];
}

export function PortfolioFilter({ technologies }: PortfolioFilterProps) {
  const { selectedTechnologies, searchQuery, setSearchQuery, toggleTechnology, clearFilters } =
    useFilterStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // 디바운스된 검색어를 스토어에 업데이트
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  const hasActiveFilters = selectedTechnologies.length > 0 || searchQuery.length > 0;

  return (
    <>
      {/* 데스크톱 필터 */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-4 rounded-lg border bg-background/50 p-6 backdrop-blur">
          {/* 검색 입력 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full rounded-md border bg-background py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
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

          {/* 기술 스택 필터 */}
          <div>
            <h3 className="mb-3 text-sm font-medium">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const isSelected = selectedTechnologies.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTechnology(tech)}
                    className={`rounded-full px-3 py-1 text-sm transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    } `}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 필터 초기화 */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* 모바일 필터 토글 버튼 */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="flex items-center gap-2 rounded-md border bg-background px-4 py-2"
        >
          <Filter className="h-4 w-4" />
          필터
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {selectedTechnologies.length + (searchQuery ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* 모바일 필터 패널 */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden md:hidden"
          >
            <div className="rounded-lg border bg-background/50 p-4 backdrop-blur">
              {/* 검색 입력 */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="프로젝트 검색..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full rounded-md border bg-background py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
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

              {/* 기술 스택 필터 */}
              <div className="mb-4">
                <h3 className="mb-3 text-sm font-medium">기술 스택</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => {
                    const isSelected = selectedTechnologies.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTechnology(tech)}
                        className={`rounded-full px-3 py-1 text-sm transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        } `}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 필터 초기화 */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  필터 초기화
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
