'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Star, Rocket, Target } from 'lucide-react';

const journeySteps = [
  {
    year: '2020',
    icon: BookOpen,
    title: '개발 여정의 시작',
    description: '독학으로 프로그래밍을 시작하며 웹 개발의 매력을 발견했습니다.',
    details: ['HTML, CSS, JavaScript 기초 학습', '첫 개인 프로젝트 완성', '오픈소스 프로젝트 참여'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    year: '2021',
    icon: Code,
    title: '기술 스택 확장',
    description: 'React와 Node.js를 학습하며 풀스택 개발자로 성장했습니다.',
    details: ['React, Next.js 전문성 확보', 'TypeScript 도입', 'REST API 및 GraphQL 활용'],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    year: '2022',
    icon: Users,
    title: '프리랜서 시작',
    description: '크몽에서 첫 프로젝트를 시작하며 고객과의 소통 노하우를 쌓았습니다.',
    details: ['첫 크몽 프로젝트 5.0점 완성', '10개 프로젝트 연속 성공', '고객 피드백 100% 긍정'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    year: '2023',
    icon: Star,
    title: '전문성 인정',
    description: '복잡한 프로젝트들을 성공적으로 완료하며 전문가로 인정받았습니다.',
    details: ['30+ 프로젝트 완료', '최고 난이도 프로젝트 해결', '멘토링 활동 시작'],
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    year: '2024',
    icon: Rocket,
    title: '성능 및 SEO 전문화',
    description: '최신 기술과 성능 최적화에 특화된 전문가로 발전했습니다.',
    details: ['Core Web Vitals 최적화', 'SEO 점수 90+ 달성', '접근성 가이드라인 전문'],
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    year: 'Now',
    icon: Target,
    title: '신뢰받는 파트너',
    description: '50+ 프로젝트 경험으로 고객의 든든한 기술 파트너가 되었습니다.',
    details: ['50+ 프로젝트 완료', '평균 5.0점 평가 유지', '98% 고객 재의뢰율'],
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
];

export function AboutJourney() {
  return (
    <section className="py-24 md:py-32">
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
            개발자{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              여정
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            끊임없는 학습과 도전을 통해 성장해온
            <br className="hidden md:block" />
            <strong>4년간의 개발 여정</strong>을 소개합니다
          </p>
        </motion.div>

        {/* 타임라인 */}
        <div className="relative">
          {/* 중앙 라인 */}
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-primary via-accent to-primary opacity-20" />

          {/* 여정 단계들 */}
          <div className="space-y-12">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  {/* 컨텐츠 카드 */}
                  <div className={`w-full max-w-lg ${isEven ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'}`}>
                    <div className="relative">
                      {/* 카드 */}
                      <div className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                        {/* 헤더 */}
                        <div className="mb-4 flex items-center gap-4">
                          <div className={`p-3 ${step.bgColor} rounded-lg`}>
                            <IconComponent className={`h-6 w-6 ${step.color}`} />
                          </div>
                          <div>
                            <div className={`text-2xl font-bold ${step.color}`}>{step.year}</div>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                        </div>

                        {/* 설명 */}
                        <p className="mb-4 leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>

                        {/* 세부사항 */}
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + detailIndex * 0.1 + 0.5,
                              }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div
                                className={`h-1.5 w-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`}
                              />
                              <span>{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* 화살표 */}
                      <div
                        className={`absolute top-8 ${isEven ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} h-0 w-0 border-8 ${isEven ? 'border-y-transparent border-l-border border-r-transparent' : 'border-y-transparent border-l-transparent border-r-border'}`}
                      />
                    </div>
                  </div>

                  {/* 중앙 점 */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.3,
                      type: 'spring',
                      bounce: 0.4,
                    }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 z-10 -translate-x-1/2 transform"
                  >
                    <div
                      className={`h-8 w-8 ${step.bgColor} flex items-center justify-center rounded-full border-4 border-background shadow-lg`}
                    >
                      <div
                        className={`h-3 w-3 rounded-full ${step.color.replace('text-', 'bg-')}`}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 현재 상태 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8">
            <h3 className="mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
              지금도 계속 성장하고 있습니다
            </h3>
            <p className="mb-6 text-lg text-muted-foreground">
              새로운 기술을 학습하고, 더 나은 사용자 경험을 만들기 위해
              <br className="hidden md:block" />
              끊임없이 노력하고 있습니다. 여러분의 프로젝트도 그 여정의 일부가 되길 바랍니다.
            </p>

            {/* 현재 학습 중인 기술들 */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Next.js 14',
                'React Server Components',
                'AI/ML Integration',
                'Web3',
                'Mobile Development',
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
