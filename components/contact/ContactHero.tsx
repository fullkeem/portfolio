'use client';

import { motion } from 'framer-motion';

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20 py-32">
      {/* Background decoration */}
      <div className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              프로젝트 문의하기
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              랜딩페이지 제작 관련 문의를 환영합니다
            </p>
            <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
          >
            아래 연락 방법을 통해 언제든지 문의해 주세요.
            <br />
            빠른 시일 내에 친절하게 답변드리겠습니다.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
