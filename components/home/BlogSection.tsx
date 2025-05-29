"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/notion/client";

export function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        // 최신 3개의 게시물만 표시
        setBlogPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
          <p className="text-lg text-muted-foreground">
            개발 경험과 인사이트를 공유합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading ? (
            // 로딩 스켈레톤
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-6 rounded-lg border bg-background animate-pulse">
                <div className="mb-4">
                  <div className="h-4 w-20 bg-muted rounded inline-block" />
                  <span className="text-xs text-muted-foreground mx-2">•</span>
                  <div className="h-4 w-24 bg-muted rounded inline-block" />
                </div>
                <div className="h-7 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted rounded mb-1" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded mt-4" />
              </div>
            ))
          ) : (
            blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 rounded-lg border bg-background hover:bg-secondary/50 transition-colors h-full">
                    <div className="mb-4">
                      <span className="text-xs text-primary font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground mx-2">•</span>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-4 text-sm text-primary font-medium group-hover:underline">
                      Read more →
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md border border-foreground/20 hover:bg-secondary transition-colors"
          >
            모든 글 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
