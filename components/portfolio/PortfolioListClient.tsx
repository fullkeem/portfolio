'use client';

import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Portfolio } from '@/types';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';

interface PortfolioListClientProps {
  portfolios: Portfolio[];
}

export function PortfolioListClient({ portfolios }: PortfolioListClientProps) {
  // Masonry 브레이크포인트 설정
  const breakpointColumns = {
    default: 3, // Desktop: 3열
    1100: 2, // Tablet: 2열
    700: 1, // Mobile: 1열
  };

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
            다양한 경험과 기술을 통해 성장하는 과정을 공유합니다.
          </p>
        </motion.div>

        {/* Masonry 갤러리 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <PortfolioCard portfolio={portfolio} index={index} />
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        {/* 결과 개수 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          총 {portfolios.length}개의 이미지
        </motion.div>
      </div>
    </div>
  );
}
