'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Portfolio } from '@/types';

export function PortfolioSection() {
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
    <section id="portfolio" className="bg-secondary/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Portfolio</h2>
          <p className="text-lg text-muted-foreground">최근 작업한 프로젝트들을 확인해보세요</p>
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
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-800"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : portfolios.map((portfolio) => (
                <motion.div key={portfolio.id} variants={itemVariants}>
                  <Link href={`/portfolio/${portfolio.id}`}>
                    <div className="group h-full cursor-pointer overflow-hidden rounded-lg border bg-background transition-transform hover:scale-[1.02]">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        {portfolio.thumbnail ? (
                          <Image
                            src={portfolio.thumbnail}
                            alt={portfolio.title}
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
                          {portfolio.projectType || 'Project'}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                          {portfolio.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">
                          {portfolio.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="rounded-md bg-secondary px-2 py-1 text-xs">
                              {tech}
                            </span>
                          ))}
                          {portfolio.technologies.length > 3 && (
                            <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                              +{portfolio.technologies.length - 3}
                            </span>
                          )}
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
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-base font-medium transition-colors hover:bg-secondary"
          >
            모든 프로젝트 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
