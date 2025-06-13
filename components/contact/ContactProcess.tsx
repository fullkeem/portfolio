'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileText, Code, Rocket } from 'lucide-react';

const processSteps = [
  {
    icon: MessageSquare,
    title: '상담 & 기획',
    description: '요구사항 분석 및 프로젝트 범위 정의',
    duration: '1-2일',
  },
  {
    icon: FileText,
    title: '디자인 & 설계',
    description: '화면 설계 및 디자인 시안 작업',
    duration: '1-2일',
  },
  {
    icon: Code,
    title: '개발 & 구현',
    description: '실제 개발 작업 및 기능 구현',
    duration: '2-4일',
  },
  {
    icon: Rocket,
    title: '테스트 & 배포',
    description: '품질 검증 후 실서버 배포',
    duration: '1-2일',
  },
];

export function ContactProcess() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">작업 프로세스</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            체계적이고 투명한 프로세스로 프로젝트를 진행합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Desktop: Step number and line above box */}
                <div className="mb-6 hidden items-center lg:flex">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="ml-4 hidden h-0.5 flex-1 bg-border lg:block" />
                  )}
                </div>

                {/* Icon and content box */}
                <div className="relative rounded-lg border border-border bg-background p-6 pl-8 text-right transition-shadow hover:shadow-md sm:p-8 lg:p-6 lg:pl-6 lg:text-left">
                  {/* Mobile & Tablet: Step number inside box at top-left */}
                  <div className="absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground lg:hidden">
                    {index + 1}
                  </div>

                  <div className="mb-4 ml-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 lg:ml-0">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mb-3 text-muted-foreground">{step.description}</p>
                  <div className="text-sm font-medium text-primary">소요 기간: {step.duration}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-lg bg-secondary/20 p-8">
            <h3 className="mb-4 text-xl font-semibold">투명한 진행 현황 공유</h3>
            <p className="text-muted-foreground">
              프로젝트 진행 상황을 실시간으로 공유하며, 각 단계별로 피드백을 받아 완성도 높은
              결과물을 만들어갑니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
