'use client';

import { Pagination } from '@/components/ui/Pagination';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
  className?: string;
}

export default function BlogPagination(props: BlogPaginationProps) {
  return <Pagination {...props} />;
}
