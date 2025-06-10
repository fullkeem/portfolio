'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
  className?: string;
  variant?: 'default' | 'compact';
  showEndPages?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChangeAction,
  className = '',
  variant = 'default',
  showEndPages = true,
  maxVisiblePages = 7,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 많은 페이지의 경우 스마트한 표시
      if (currentPage <= 4) {
        // 시작 부분
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (showEndPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 3) {
        // 끝 부분
        if (showEndPages) {
          pages.push(1);
          pages.push('...');
        }
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 중간 부분
        if (showEndPages) {
          pages.push(1);
          pages.push('...');
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (showEndPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center justify-center gap-2', className)}>
        <button
          onClick={() => onPageChangeAction(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center rounded border transition-all enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="이전 페이지"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm text-muted-foreground">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChangeAction(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded border transition-all enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="다음 페이지"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChangeAction(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChangeAction(pageNumber)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              )}
              aria-label={`페이지 ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChangeAction(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
