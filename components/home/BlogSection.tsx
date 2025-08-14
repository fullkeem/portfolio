'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import { BlogImage } from '@/components/ui/OptimizedImage';

interface Props {
  posts: BlogPost[];
}

export function BlogSection({ posts }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as const;

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Blog</h2>
          <p className="text-lg text-muted-foreground">개발 경험과 인사이트를 공유합니다</p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants} initial={false}>
              <div className="group relative h-full overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`${post.title} 상세 보기`}
                />
                <div className="relative z-10">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <BlogImage
                      src={post.coverImage ?? '/images/placeholder.jpg'}
                      alt={post.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      useProxy={false}
                    />
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
              </div>
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
            prefetch={false}
          >
            모든 글 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
