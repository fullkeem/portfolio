'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Portfolio } from '@/types';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';
import { useFilterStore } from '@/store/filterStore';

interface PortfolioListClientProps {
  portfolios: Portfolio[];
}

export function PortfolioListClient({ portfolios }: PortfolioListClientProps) {
  const { selectedTechnologies, searchQuery } = useFilterStore();

  // 필터링된 포트폴리오
  const filteredPortfolios = useMemo(() => {
    return portfolios.filter((portfolio) => {
      // 검색어 필터
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          portfolio.title.toLowerCase().includes(searchLower) ||
          portfolio.description.toLowerCase().includes(searchLower) ||
          portfolio.technologies.some((tech) => tech.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // 기술 스택 필터
      if (selectedTechnologies.length > 0) {
        const hasSelectedTech = selectedTechnologies.some((tech) =>
          portfolio.technologies.includes(tech)
        );
        if (!hasSelectedTech) return false;
      }

      return true;
    });
  }, [portfolios, selectedTechnologies, searchQuery]);

  // 모든 기술 스택 추출
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    portfolios.forEach((portfolio) => {
      portfolio.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [portfolios]);

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
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Portfolio</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            다양한 프로젝트들을 통해 쌓아온 경험과 기술력을 확인해보세요
          </p>
        </motion.div>

        {/* 필터 섹션 */}
        <PortfolioFilter technologies={allTechnologies} />

        {/* 포트폴리오 그리드 */}
        <div className="mt-12">
          {filteredPortfolios.length > 0 ? (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {filteredPortfolios.map((portfolio) => (
                <motion.div key={portfolio.id} variants={itemVariants}>
                  <PortfolioCard portfolio={portfolio} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="text-lg text-muted-foreground">
                검색 결과가 없습니다. 다른 필터를 시도해보세요.
              </p>
            </motion.div>
          )}
        </div>

        {/* 결과 개수 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          총 {filteredPortfolios.length}개의 프로젝트
        </motion.div>
      </div>
    </div>
  );
}
