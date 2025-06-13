'use client';

import { motion } from 'framer-motion';
import { Users, Award, Wrench, Heart, TrendingUp, Clock } from 'lucide-react';
import Image from 'next/image';

const credibilitySteps = [
  {
    step: '01',
    icon: Users,
    title: '모든 사용자를 위한 접근성 우선 개발',
    subtitle: '차별과 불편함 없는 포용적 웹사이트 제작',
    features: [
      'WCAG 2.1 AA 기준 준수',
      '스크린 리더 완벽 지원 (ARIA)',
      '키보드 네비게이션 완전 지원',
      '시각/청각/운동 장애인 모두 고려',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    step: '02',
    icon: Award,
    title: '웹 표준과 품질을 지키는 체계적 개발',
    subtitle: '모든 환경에서 안정적으로 작동하는 웹사이트',
    features: [
      '최신 웹 표준 기술 활용 (HTML5, CSS3)',
      'TypeScript로 타입 안전성 보장',
      'ESLint, Prettier 코드 품질 관리',
      '크로스 브라우저 완벽 호환성',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    step: '03',
    icon: Wrench,
    title: '실제 구현으로 증명하는 기술력',
    subtitle: '이론이 아닌 실제 작동하는 코드로 보여드립니다',
    features: [
      '이 포트폴리오 사이트가 실력의 증명',
      'Lighthouse 90점 이상 성능 최적화',
      '25-35% 로딩 속도 향상 달성',
      '체계적인 개발 프로세스와 문서화',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
];

const stats = [
  {
    icon: Heart,
    number: '100%',
    label: '접근성 준수',
    color: 'text-red-500',
  },
  {
    icon: TrendingUp,
    number: '90+',
    label: 'Lighthouse 점수',
    color: 'text-green-500',
  },
  {
    icon: Clock,
    number: '35%',
    label: '성능 향상',
    color: 'text-blue-500',
  },
];

export function AboutCredibility() {
  return (
    <section className="bg-secondary/30 py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 + Heart 이미지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              신뢰할 수 있는 이유
            </span>
          </h2>

          {/* Heart 이미지 - h2 제목 옆에 배치 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute hidden md:-top-3 md:right-[13%] md:block lg:-top-3 lg:right-[22%]"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                x: [0, 3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <Image
                src="/images/heart.png"
                alt="신뢰와 사랑으로"
                width={120}
                height={120}
                className="h-20 w-20 drop-shadow-xl transition-transform duration-300 hover:scale-110 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              />
              {/* 글로우 효과 */}
              <div className="absolute inset-0 -z-10 rounded-full bg-red-500/20 opacity-70 blur-lg lg:opacity-100" />
            </motion.div>
          </motion.div>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            접근성, 표준 준수, 그리고 실제 구현 능력이 만들어내는
            <br className="hidden md:block" />
            <strong>3단계 개발 철학</strong>
          </p>
        </motion.div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          {/* 통계 그리드 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
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
                    className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background"
                  >
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`mb-2 text-4xl font-bold ${stat.color}`}>{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 신뢰성 단계들 */}
        <div className="space-y-16">
          {credibilitySteps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* 컨텐츠 */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`text-6xl font-bold ${step.color} opacity-20`}>{step.step}</div>
                    <div>
                      <h3 className="mb-2 text-2xl font-bold md:text-3xl">{step.title}</h3>
                      <p className="text-lg text-muted-foreground">{step.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.2 + featureIndex * 0.1 + 0.5,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${step.color.replace('text-', 'bg-')}`}
                        />
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 아이콘 & 시각적 요소 */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2 + 0.3,
                      type: 'spring',
                      bounce: 0.3,
                    }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div
                      className={`h-32 w-32 ${step.bgColor} flex items-center justify-center rounded-2xl border ${step.borderColor} relative overflow-hidden`}
                    >
                      <IconComponent className={`h-16 w-16 ${step.color}`} />

                      {/* 배경 패턴 */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid h-full grid-cols-4 gap-1 p-2">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className={`${step.color.replace('text-', 'bg-')} rounded-sm`}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 0.3 }}
                              transition={{ delay: index * 0.2 + i * 0.05 + 0.8 }}
                              viewport={{ once: true }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 글로우 효과 */}
                    <div
                      className={`absolute inset-0 ${step.bgColor} -z-10 rounded-2xl opacity-30 blur-xl`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 마무리 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 p-8">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              접근성과 표준을 지키는 개발 철학으로
            </h3>
            <p className="text-lg text-muted-foreground">
              모든 사용자가 차별받지 않는 웹사이트를 만들어드리겠습니다.
              <br className="hidden md:block" />
              기술적 완성도와 사용자 중심의 설계를 모두 만족하는 프로젝트를 약속드립니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
