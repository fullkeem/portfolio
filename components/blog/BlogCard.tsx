'use client';

import { Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { getImageOrFallback } from '@/lib/utils/image';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const metadata = [
    {
      icon: <Calendar className="h-3 w-3" />,
      text: formatDate(post.publishedAt),
    },
  ];

  // 이미지 URL 결정 (설정에 따라 대체 이미지 사용 가능)
  const imageUrl = getImageOrFallback(post.coverImage, post.category);

  return (
    <Card
      title={post.title}
      description={post.excerpt}
      href={`/blog/${post.slug}`}
      image={imageUrl}
      imageAlt={post.title}
      category={post.category}
      metadata={metadata}
      tags={post.tags}
      index={index}
      priority={index < 2}
      animation={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }}
    />
  );
}
