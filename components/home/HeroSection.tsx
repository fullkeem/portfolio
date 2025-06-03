'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useGSAP } from '@gsap/react';

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 필수 ref들만 체크 (containerRef는 scope로 사용되므로 체크하지 않음)
      if (!titleRef.current || !subtitleRef.current) {
        return;
      }

      // Initial animations
      const tl = gsap.timeline();

      // Title animation
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      // Subtitle animation
      tl.from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.5'
      );

      // Typing effect for subtitle - 더 안전한 방식으로 변경
      if (subtitleRef.current) {
        // 텍스트를 미리 설정하고 opacity로 나타내기
        subtitleRef.current.textContent = '랜딩 페이지 제작 전문 프론트엔드 개발자';

        tl.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Background parallax effect - null 체크 추가
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: backgroundRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Hide scroll indicator on scroll - null 체크 추가
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: scrollIndicatorRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }

      // Hero section fade out effect - null 체크 추가
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 0.3,
          scale: 0.95,
          scrollTrigger: {
            trigger: heroContentRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // cleanup 함수 반환
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: containerRef,
      revertOnUpdate: true, // 컴포넌트 업데이트 시 애니메이션 정리
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient with parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 scale-110 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
      />

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
        <div ref={heroContentRef} className="hero-content mx-auto max-w-4xl text-center">
          <h1
            ref={titleRef}
            className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            Frontend Developer
          </h1>
          <p ref={subtitleRef} className="mb-8 h-8 text-xl text-muted-foreground md:text-2xl">
            {/* Text will be animated here */}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              magneticStrength={0.4}
              scaleOnHover={1.1}
            >
              포트폴리오 보기
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary/80"
              magneticStrength={0.4}
              scaleOnHover={1.1}
            >
              프로젝트 문의
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
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
