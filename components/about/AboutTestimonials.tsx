'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// const achievements = [
//   {
//     number: '50+',
//     label: '완료 프로젝트',
//     description: '다양한 업종의 성공적인 프로젝트',
//   },
//   {
//     number: '5.0',
//     label: '평균 평점',
//     description: '모든 프로젝트 만점 평가',
//   },
//   {
//     number: '98%',
//     label: '재의뢰율',
//     description: '높은 고객 만족도',
//   },
//   {
//     number: '100%',
//     label: '일정 준수',
//     description: '약속된 납기 준수',
//   },
// ];

export function AboutTestimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            고객{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              후기
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            실제 프로젝트를 함께한 고객들의
            <br className="hidden md:block" />
            <strong>진솔한 후기</strong>를 확인해보세요
          </p>
        </motion.div> */}

        {/* 성과 통계 */}
        {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  viewport={{ once: true }}
                  className="mb-2 text-4xl font-bold text-primary md:text-5xl"
                >
                  {achievement.number}
                </motion.div>
                <div className="mb-1 text-lg font-semibold">{achievement.label}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
              </div>
            ))}
          </motion.div> */}

        {/* CTA 섹션 - 강조 박스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative text-center"
        >
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            {/* Calling 이미지 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute hidden md:left-4 md:top-5 md:block lg:left-12 lg:top-5 xl:left-20 xl:top-5"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 15, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <Image
                  src="/images/calling.png"
                  alt="프로젝트 시작하기"
                  width={120}
                  height={120}
                  className="h-16 w-16 drop-shadow-xl transition-transform duration-300 hover:scale-110 lg:h-20 lg:w-20 xl:h-20 xl:w-20"
                />
                {/* 글로우 효과 */}
                <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 opacity-70 blur-lg lg:opacity-100" />
              </motion.div>
            </motion.div>
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              함께 만들어갈 첫 번째 성공 스토리
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              신선한 아이디어와 열정으로 여러분만의 특별한 웹사이트를
              <br className="hidden md:block" />
              합리적인 가격에 정성껏 제작해드립니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                더 많은 프로젝트 보기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-8 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary/80"
              >
                프로젝트 시작하기
              </Link>
            </div>

            {/* 신뢰 배지 */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% 고객 만족</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>무료 상담</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>사후 지원</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
