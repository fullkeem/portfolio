'use client';

import Link from 'next/link';
import { BlogImage } from '@/components/ui/OptimizedImage';
import { Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/common/MagneticButton';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const priority = index < 3; // 처음 3개만 우선 로딩

  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch
      className="group block h-full rounded-lg border bg-background transition-all hover:bg-secondary/50 hover:shadow-md"
    >
      <TiltCard className="flex h-full flex-col overflow-hidden rounded-lg">
        {/* 이미지 */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <BlogImage
              src={post.coverImage}
              alt={post.title}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {/* 메타 정보 */}
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
              {post.category}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          {/* 제목 */}
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {/* 설명 */}
          <p
            className={cn(
              'mb-4 flex-1 leading-relaxed text-muted-foreground',
              post.tags.length > 0 ? 'line-clamp-2' : 'line-clamp-3'
            )}
          >
            {post.excerpt}
          </p>

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </TiltCard>
    </Link>
  );
}
