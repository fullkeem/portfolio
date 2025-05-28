"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

// 임시 데이터 - 나중에 Notion API로 대체
const portfolios = [
  {
    id: "1",
    title: "E-commerce Landing Page",
    description: "모던한 이커머스 랜딩 페이지",
    thumbnail: "/images/portfolio1.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "2",
    title: "SaaS Product Website",
    description: "SaaS 제품 소개 웹사이트",
    thumbnail: "/images/portfolio2.jpg",
    technologies: ["React", "TypeScript", "GSAP"],
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "개인 포트폴리오 웹사이트",
    thumbnail: "/images/portfolio3.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Notion API"],
  },
];

export function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-lg text-muted-foreground">
            최근 작업한 프로젝트들을 확인해보세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${portfolio.id}`}>
                <motion.article
                  className="group relative overflow-hidden rounded-lg bg-background border cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {/* 임시 배경 - 실제 이미지로 대체 예정 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-foreground/10">
                        {portfolio.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {portfolio.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {portfolio.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-secondary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            모든 프로젝트 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
