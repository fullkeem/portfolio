"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/types";
import { PortfolioCardSkeleton } from "@/components/common/loading/Skeleton";

export function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios');
        const data = await response.json();
        setPortfolios(data.filter((p: Portfolio) => p.featured).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

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
          {loading ? (
            // 로딩 스켈레톤
            [...Array(3)].map((_, i) => (
              <PortfolioCardSkeleton key={i} />
            ))
          ) : (
            portfolios.map((portfolio, index) => (
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
                      {portfolio.thumbnail ? (
                        <Image
                          src={portfolio.thumbnail}
                          alt={portfolio.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {portfolio.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {portfolio.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-secondary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {portfolio.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 text-muted-foreground">
                            +{portfolio.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
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
