'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Portfolio } from '@/types';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';
import { PortfolioCardSkeleton } from '@/components/common/loading/Skeleton';
import { useFilterStore } from '@/store/filterStore';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedTechnologies, searchQuery } = useFilterStore();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios');
        const data = await response.json();
        setPortfolios(data);
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

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

      // 프로젝트 타입 필터 (타입 속성이 있다면)
      // if (selectedType && portfolio.projectType !== selectedType) {
      //   return false;
      // }

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
          {loading ? (
            // 로딩 스켈레톤
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <PortfolioCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPortfolios.length > 0 ? (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredPortfolios.map((portfolio, index) => (
                <motion.div
                  key={portfolio.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <PortfolioCard portfolio={portfolio} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // 결과 없음
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
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            총 {filteredPortfolios.length}개의 프로젝트
          </motion.div>
        )}
      </div>
    </div>
  );
}
