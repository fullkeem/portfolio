'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 타이틀 애니메이션
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // 서브타이틀 애니메이션
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-primary/5"
    >
      {/* 배경 데코레이션 */}
      <div className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-transparent" />

      {/* 플로팅 요소들 */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* 메인 타이틀 */}
          <div ref={titleRef} className="mb-8">
            <h1 className="mb-6 text-5xl font-bold leading-loose md:text-7xl">
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                크몽에서 만나볼 수 있는
              </span>
              {/* <span className="block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                신뢰할 수 있는
              </span> */}
              <span className="block bg-gradient-to-r from-foreground to-accent/70 bg-clip-text text-transparent">
                프론트엔드 개발자
              </span>
            </h1>
          </div>

          {/* 서브타이틀 */}
          <div ref={subtitleRef}>
            <div className="mb-8">
              <p className="mb-2 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                혼자 고민하던 <span className="font-semibold text-primary">랜딩 페이지 제작</span>,
              </p>
              <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                이제 <span className="font-semibold text-foreground">웹 개발자</span>와 함께
                해결해보세요.
              </p>
            </div>

            {/* 키워드 태그들 */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {[
                '고객 중심 소통',
                '완성도 높은 결과물',
                '약속된 일정 준수',
                '사후 관리',
                '합리적 가격',
              ].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTA 버튼들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              {/* <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                포트폴리오 보기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link> */}

              <Link
                href="/contact"
                className="block rounded-lg border border-border bg-secondary px-10 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary/80"
              >
                프로젝트 문의하기
              </Link>
            </motion.div>

            {/* 스크롤 인디케이터 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-16"
            >
              <div className="flex flex-col items-center text-muted-foreground">
                <span className="mb-4 text-sm">아래로 스크롤하여 더 알아보기</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
