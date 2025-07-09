import type { Metadata } from 'next';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
  description: '개발 경험과 인사이트를 공유합니다',
  openGraph: {
    title: 'Blog | fullkeem',
    description: '개발 경험과 인사이트를 공유합니다',
  },
  twitter: {
    title: 'Blog | fullkeem',
    description: '개발 경험과 인사이트를 공유합니다',
  },
};

async function getBlogPostsData(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`,
      {
        cache: 'force-cache',
      }
    );
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPostsData();

  return <BlogListClient blogPosts={blogPosts} />;
}
