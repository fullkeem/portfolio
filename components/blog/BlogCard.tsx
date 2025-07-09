'use client';

import { Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

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

  return (
    <Card
      title={post.title}
      description={post.excerpt}
      href={`/blog/${post.slug}`}
      image={post.coverImage}
      imageAlt={post.title}
      category={post.category}
      metadata={metadata}
      tags={post.tags}
      priority={index < 3}
    />
  );
}
