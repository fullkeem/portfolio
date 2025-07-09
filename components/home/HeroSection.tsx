'use client';

import { motion } from 'framer-motion';
import { Avatar3D } from '@/components/3d/Avatar3D';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[60vh] items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div className="order-2 space-y-6 text-center lg:order-1 lg:space-y-8 lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  Fullkeem
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:text-xl xl:text-2xl"
                >
                  랜딩 페이지 제작 전문 프론트엔드 개발자
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start lg:gap-4"
              >
                <a
                  href="#portfolio"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  포트폴리오 보기
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-8 text-lg font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  프로젝트 문의
                </a>
              </motion.div>
            </div>

            {/* 오른쪽: 3D 아바타 */}
            <motion.div
              className="order-1 flex justify-center lg:order-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              <Avatar3D size="xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="h-6 w-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
