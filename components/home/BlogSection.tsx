'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Blog</h2>
          <p className="text-lg text-muted-foreground">개발 경험과 인사이트를 공유합니다</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border bg-background p-0">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              ))
            : posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group h-full cursor-pointer overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02]">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-2 text-xs font-medium text-primary">
                          {post.category || 'Blog'}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-base font-medium transition-colors hover:bg-secondary"
          >
            모든 글 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
