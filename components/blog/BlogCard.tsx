'use client';

import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate, calculateReadingTime } from '@/lib/utils';
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
    {
      icon: <Clock className="h-3 w-3" />,
      text: `${calculateReadingTime(post.excerpt)}분`,
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
