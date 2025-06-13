'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AboutHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inView && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, [inView]);

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 ref={titleRef} className="mb-6 text-4xl font-bold md:text-6xl">
            안녕하세요!
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              프론트엔드 개발자
            </span>{' '}
            풀킴입니다
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            사용자 중심의 웹 경험을 만들어가는 개발자입니다.
            <br />
            프론트엔드부터 백엔드까지, 완성도 높은 서비스를 구현합니다.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              프로젝트 문의하기
            </motion.a>

            <motion.a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-base font-medium transition-colors hover:bg-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              포트폴리오 보기
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
