'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  tools: ['Git', 'Figma', 'VS Code', 'Vercel', 'Notion'],
  learning: ['Three.js', 'WebGL', 'React Native'],
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useGSAP(
    () => {
      // ref와 요소들이 존재하는지 확인
      if (!sectionRef.current || !skillsRef.current) return;

      // Skills animation with stagger - 더 안전한 선택자 사용
      const skillTags = skillsRef.current.querySelectorAll('.skill-tag');
      if (skillTags.length > 0) {
        gsap.fromTo(
          skillTags,
          {
            opacity: 0,
            scale: 0.8,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              amount: 1.2,
              from: 'start',
            },
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Section background reveal
      gsap.fromTo(
        sectionRef.current,
        {
          background: 'transparent',
        },
        {
          background:
            'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--secondary))/0.3 100%)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // Parallax effect for skill categories - 더 안전한 선택자 사용
      const skillCategories = skillsRef.current.querySelectorAll('.skill-category');
      if (skillCategories.length > 0) {
        gsap.to(skillCategories, {
          y: (i) => 15 * (i + 1), // 아래로 살짝 이동
          scale: (i) => 1 - 0.02 * i, // 미세한 스케일 변화
          opacity: (i) => 1 - 0.1 * i, // 미세한 투명도 변화
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 70%', // 더 늦게 시작
            end: 'bottom 30%', // 더 일찍 끝
            scrub: 0.5, // 더 부드럽게
          },
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [inView], // inView 변화 시 재실행
    }
  );

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
    <section id="about" ref={sectionRef} className="py-20 transition-all duration-1000 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mx-auto max-w-4xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="prose prose-lg mx-auto mb-12 dark:prose-invert"
          >
            <p>
              안녕하세요! 사용자 경험을 중시하는 프론트엔드 개발자입니다. 깔끔하고 직관적인
              인터페이스와 부드러운 인터랙션을 구현하는 것을 좋아합니다.
            </p>
            <p>
              크몽에서 랜딩 페이지 제작 서비스를 시작하며, 고객의 비즈니스 목표를 달성할 수 있는
              효과적인 웹사이트를 만들고 있습니다. 최신 웹 기술을 활용하여 빠르고 반응형인
              웹사이트를 제작합니다.
            </p>
          </motion.div>

          <motion.div ref={skillsRef} variants={itemVariants} className="grid gap-8 md:grid-cols-3">
            <div className="skill-category">
              <h3 className="mb-4 text-xl font-semibold">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag cursor-default rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3 className="mb-4 text-xl font-semibold">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag cursor-default rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3 className="mb-4 text-xl font-semibold">Learning</h3>
              <div className="flex flex-wrap gap-2">
                {skills.learning.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag cursor-default rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
