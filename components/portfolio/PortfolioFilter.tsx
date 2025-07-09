'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { useDebounce } from '@/hooks/useDebounce';

interface PortfolioFilterProps {
  technologies: string[];
}

export function PortfolioFilter({ technologies }: PortfolioFilterProps) {
  const { selectedTechnologies, searchQuery, setSearchQuery, toggleTechnology, clearFilters } =
    useFilterStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // 디바운스된 검색어를 스토어에 업데이트
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  const hasActiveFilters = selectedTechnologies.length > 0 || searchQuery.length > 0;

  return (
    <div className="mb-8">
      <div className="rounded-lg border bg-background/50 p-4 backdrop-blur md:p-6">
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
                  }`}
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
  );
}
