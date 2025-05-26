"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// 임시 데이터 - 나중에 Notion API로 대체
const blogPosts = [
  {
    id: "1",
    title: "Next.js 15의 새로운 기능들",
    slug: "nextjs-15-new-features",
    excerpt: "Next.js 15에서 추가된 새로운 기능들과 개선사항들을 살펴봅니다.",
    category: "기술 블로그",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "GSAP로 인터랙티브 웹 만들기",
    slug: "interactive-web-with-gsap",
    excerpt: "GSAP를 활용하여 멋진 스크롤 애니메이션을 구현하는 방법을 알아봅니다.",
    category: "튜토리얼",
    publishedAt: "2024-01-10",
  },
  {
    id: "3",
    title: "랜딩 페이지 제작 프로세스",
    slug: "landing-page-process",
    excerpt: "효과적인 랜딩 페이지를 만들기 위한 단계별 프로세스를 공유합니다.",
    category: "제작 과정",
    publishedAt: "2024-01-05",
  },
];

export function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          {blogPosts.map((post, index) => (
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
          ))}
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
