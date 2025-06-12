'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Avatar3D } from '@/components/3d/Avatar3D';
import { useGSAP } from '@gsap/react';

// GSAP 플러그인 등록 (ScrollTrigger 제거)
gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 필수 ref들만 체크
      if (!titleRef.current) {
        return;
      }

      // 초기 애니메이션 - 아바타와 시퀀스 맞춤
      const tl = gsap.timeline();

      // Title animation - 아바타보다 먼저 시작
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // cleanup 함수 반환
      return () => {
        tl.kill();
      };
    },
    {
      scope: containerRef,
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={containerRef}
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient with CSS parallax */}
      <div className="hero-background absolute inset-0 scale-110 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Animated background shapes */}
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

      <div className="container relative z-10 mx-auto px-4 py-32">
        {/* 그리드 레이아웃으로 변경: 왼쪽 텍스트 + 오른쪽 아바타 */}
        <div className="hero-content mx-auto max-w-7xl">
          <div className="grid min-h-[60vh] items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div className="order-2 space-y-6 text-center lg:order-1 lg:space-y-8 lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <h1
                  ref={titleRef}
                  className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                >
                  Fullkeem
                </h1>
                <motion.p
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:text-xl xl:text-2xl"
                >
                  랜딩 페이지 제작 전문 프론트엔드 개발자
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start lg:gap-4"
              >
                <MagneticButton
                  href="#portfolio"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 lg:px-8 lg:py-3 lg:text-base"
                  magneticStrength={0}
                  scaleOnHover={1.1}
                >
                  포트폴리오 보기
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-secondary px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 lg:px-8 lg:py-3 lg:text-base"
                  magneticStrength={0}
                  scaleOnHover={1.1}
                >
                  프로젝트 문의
                </MagneticButton>
              </motion.div>
            </div>

            {/* 오른쪽: 3D 아바타 */}
            <motion.div
              className="order-1 flex justify-center lg:order-2 lg:justify-center"
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 1.4,
                duration: 1.2,
                ease: 'easeOut',
              }}
            >
              <div className="relative">
                {/* 아바타 주변 장식 요소 */}
                <motion.div
                  className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <Avatar3D
                  size="xl"
                  animationSpeed="normal"
                  className="relative z-10 drop-shadow-2xl"
                  description="프론트엔드 개발자 fullkeem의 3D 아바타. 마우스를 올리거나 클릭하면 인터랙티브한 3D 효과를 경험할 수 있습니다."
                  ariaLabel="개발자 아바타. 인터랙티브한 3D 효과가 있습니다. Enter 또는 Space 키로 상호작용할 수 있습니다."
                  focusable={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with CSS-only animation */}
      <motion.div
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="h-6 w-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
