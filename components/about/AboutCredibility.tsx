'use client';

import { motion } from 'framer-motion';
import { Users, Award, Wrench, Heart, TrendingUp, Clock } from 'lucide-react';

const credibilitySteps = [
  {
    step: '01',
    icon: Users,
    title: '고객들이 인정하는 실력',
    subtitle: '실제 프로젝트를 통해 검증된 개발 역량',
    features: [
      '50+ 크몽 프로젝트 완료',
      '평균 5.0점 만점 평가',
      '98% 고객 재의뢰율',
      '복잡한 요구사항도 완벽 구현',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    step: '02',
    icon: Award,
    title: '전문가들이 인정하는 기술력',
    subtitle: '업계 표준을 따르는 고품질 코드',
    features: [
      'React/Next.js 전문가 인증',
      '최신 웹 기술 스택 활용',
      '성능 최적화 & SEO 전문',
      '접근성 가이드라인 준수',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    step: '03',
    icon: Wrench,
    title: '시스템화된 작업 프로세스',
    subtitle: '체계적인 개발 방법론으로 안정적인 결과',
    features: [
      '단계별 진행 상황 공유',
      'Git 버전 관리 시스템',
      '코드 리뷰 & 테스트',
      '사후 유지보수 지원',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
];

const stats = [
  {
    icon: Heart,
    number: '50+',
    label: '완료 프로젝트',
    color: 'text-red-500',
  },
  {
    icon: TrendingUp,
    number: '5.0',
    label: '평균 평점',
    color: 'text-green-500',
  },
  {
    icon: Clock,
    number: '98%',
    label: '일정 준수율',
    color: 'text-blue-500',
  },
];

export function AboutCredibility() {
  return (
    <section className="bg-secondary/30 py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              신뢰할 수 있는 이유
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            고객, 전문가, 그리고 체계적인 시스템이 만들어내는
            <br className="hidden md:block" />
            <strong>3단계 신뢰성 검증</strong>
          </p>
        </motion.div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
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
              검증된 실력과 체계적인 프로세스로
            </h3>
            <p className="text-lg text-muted-foreground">
              여러분의 프로젝트를 성공으로 이끌어드리겠습니다.
              <br className="hidden md:block" />
              지금까지의 모든 경험과 노하우를 여러분의 프로젝트에 집중하겠습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
