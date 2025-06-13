'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, MessageSquare, Clock, Zap, Shield } from 'lucide-react';
import Image from 'next/image';

const problems = [
  {
    icon: MessageSquare,
    title: '기술적 용어가 어려워 소통이 막막해요',
    description: '개발자와 대화할 때 무슨 말인지 이해하기 어려워요',
  },
  {
    icon: Clock,
    title: '일정과 예산을 지켜줄까 불안해요',
    description: '프로젝트가 언제 끝날지, 비용이 얼마나 들지 모르겠어요',
  },
  {
    icon: Zap,
    title: '완성도 높은 결과물을 받을 수 있을까요?',
    description: '디자인이나 기능이 기대와 다를까봐 걱정돼요',
  },
];

const solutions = [
  {
    icon: CheckCircle,
    title: '비개발자도 이해하기 쉬운 설명',
    description: '복잡한 기술 용어 대신 쉬운 말로 친근하게 소통합니다',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Shield,
    title: '투명한 일정 관리와 예산 준수',
    description: '프로젝트 시작 전 명확한 일정과 비용을 제시하고 약속을 지킵니다',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: '고객 만족을 위한 완성도 추구',
    description: '중간 점검과 피드백을 통해 기대 이상의 결과물을 만들어갑니다',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export function AboutProblemSolution() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 문제점 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            랜딩 페이지 제작, <span className="text-red-500">이런 고민</span> 해보셨나요?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            많은 분들이 랜딩 페이지 제작을 의뢰할 때 겪는 공통적인 어려움들입니다.
          </p>
        </motion.div>

        {/* 문제점 카드들 */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {problems.map((problem, index) => {
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800/30 dark:bg-red-900/10">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-red-700 dark:text-red-400">
                    {problem.title}
                  </h3>
                  <p className="leading-relaxed text-red-600 dark:text-red-300">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 전환 메시지 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Heart 이미지 - 배경에 반투명하게 겹치게 배치 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <Image
                  src="/images/heart.png"
                  alt="따뜻한 마음으로 함께합니다"
                  width={200}
                  height={200}
                  className="opacity-10 blur-sm dark:opacity-5"
                />
                {/* 추가 글로우 효과 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl" />
              </motion.div>
            </motion.div>

            <div className="relative inline-block bg-background px-8 py-4">
              <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                저와 함께하면 다릅니다
              </h2>
            </div>
          </div>
        </motion.div>

        {/* 해결책 섹션 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="rounded-lg border border-border bg-background p-8 text-center transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 ${solution.bgColor} rounded-full`}>
                      <IconComponent className={`h-8 w-8 ${solution.color}`} />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">{solution.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{solution.description}</p>
                </div>

                {/* 호버 효과 */}
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        {/* 강조 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <h3 className="mb-4 text-2xl font-bold">함께하면 더 쉽고, 더 안전하게</h3>
            <p className="text-lg text-muted-foreground">
              복잡한 웹 개발을 이해하기 쉽게 설명하고,
              <br className="hidden md:block" />
              약속된 일정과 품질로 만족스러운 결과를 만들어갑니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
