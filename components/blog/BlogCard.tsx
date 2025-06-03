'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background transition-all hover:bg-secondary/50 hover:shadow-lg">
          {/* 커버 이미지 */}
          {post.coverImage && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="flex-1 p-6">
            {/* 메타 정보 */}
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                {post.category}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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
            <p className="mb-4 line-clamp-3 leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <Tag className="h-3 w-3 text-muted-foreground" />
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
