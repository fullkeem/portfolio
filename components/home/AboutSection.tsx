'use client';

import { motion } from 'framer-motion';

// 사용되지 않는 상수 제거 (ESLint: no-unused-vars)

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="bg-secondary/10 pb-10 pt-20 md:pb-20 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto max-w-5xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="prose prose-lg mx-auto mb-12 w-full text-center dark:prose-invert"
          >
            <h4>다양한 서비스를 만들고 체험해보고 싶은 개발자입니다. </h4>
            <p>
              검색-생성형(AI) 시대에 맞춰 AEO(Answer Engine Optimization) + Core Web Vitals를
              기본기로 삼아, &ldquo;질문-즉답-전환&rdquo; 퍼널을 빠르게 구현하는 랜딩페이지 제작을
              하고 있습니다. <br />
              작은 화면에서도 3초 안에 핵심 메시지를 전달하고, 단일 CTA로 행동을 이끌어 내는 것이 제
              강점입니다.
            </p>
            <p>
              &ldquo;데이터로 증명되는 디자인&rdquo; 제 랜딩페이지는 단순히 눈에 보이는 화면이
              아니라, 클릭률과 전환률이 지속적으로 개선되는 살아 있는 자산입니다. 함께 성장할 준비가
              되셨다면 언제든 편하게 연락주세요!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
