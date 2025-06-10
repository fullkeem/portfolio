'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Clock, Palette, Zap, Shield, Heart } from 'lucide-react';

const philosophies = [
  {
    icon: MessageCircle,
    title: '소통 우선',
    description: '기술적 용어보다 이해하기 쉬운 말로',
    detail:
      '복잡한 개발 과정을 고객이 이해할 수 있도록 쉽게 설명하고, 단계별 진행 상황을 투명하게 공유합니다.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    quote: '"기술은 사람을 위한 것이어야 합니다"',
  },
  {
    icon: Clock,
    title: '약속 준수',
    description: '정해진 일정과 예산을 반드시 지키는',
    detail:
      '프로젝트 시작 전 충분한 계획을 세우고, 예상치 못한 상황에도 유연하게 대응하여 약속을 지킵니다.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    quote: '"신뢰는 약속을 지키는 것에서 시작됩니다"',
  },
  {
    icon: Palette,
    title: '사용자 중심',
    description: '아름답고 사용하기 편한 인터페이스',
    detail:
      '단순히 기능만 구현하는 것이 아니라, 사용자의 관점에서 직관적이고 접근하기 쉬운 경험을 만듭니다.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    quote: '"좋은 디자인은 보이지 않는 곳에 있습니다"',
  },
  {
    icon: Zap,
    title: '성능 최적화',
    description: '빠르고 효율적인 웹사이트',
    detail:
      '최신 기술과 최적화 기법을 활용하여 빠른 로딩 속도와 부드러운 사용자 경험을 제공합니다.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    quote: '"속도는 곧 사용자 만족도입니다"',
  },
  {
    icon: Shield,
    title: '안정성 보장',
    description: '견고하고 안전한 코드 구조',
    detail: '코드 리뷰, 테스트, 보안 검증을 통해 안정적이고 유지보수가 쉬운 웹사이트를 만듭니다.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    quote: '"튼튼한 기초가 오래가는 건물을 만듭니다"',
  },
  {
    icon: Heart,
    title: '지속적 관심',
    description: '프로젝트 완료 후에도 함께하는',
    detail:
      '프로젝트가 끝난 후에도 업데이트, 수정 사항, 기술 지원을 통해 지속적으로 도움을 드립니다.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    quote: '"좋은 관계는 프로젝트를 넘어서 계속됩니다"',
  },
];

const workProcess = [
  {
    step: '01',
    title: '깊은 이해',
    description: '고객의 비즈니스와 목표를 정확히 파악합니다',
    tasks: ['요구사항 분석', '목표 설정', '예산 및 일정 계획'],
  },
  {
    step: '02',
    title: '체계적 설계',
    description: '사용자 경험을 중심으로 한 설계를 진행합니다',
    tasks: ['UI/UX 설계', '기술 스택 선정', '프로토타입 제작'],
  },
  {
    step: '03',
    title: '단계별 개발',
    description: '투명한 진행 상황 공유와 피드백을 받으며 개발합니다',
    tasks: ['반복적 개발', '중간 점검', '피드백 반영'],
  },
  {
    step: '04',
    title: '완성 및 지원',
    description: '철저한 테스트 후 배포하고 지속적으로 지원합니다',
    tasks: ['품질 검증', '배포', '사후 지원'],
  },
];

export function AboutPhilosophy() {
  return (
    <section className="bg-secondary/30 py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 개발 철학 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            개발{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              철학
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            코드를 작성하는 것을 넘어서,
            <br className="hidden md:block" />
            <strong>사람과 비즈니스를 위한 가치</strong>를 만들어갑니다
          </p>
        </motion.div>

        {/* 철학 카드들 */}
        <div className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {philosophies.map((philosophy, index) => {
            const IconComponent = philosophy.icon;
            return (
              <motion.div
                key={philosophy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                  {/* 아이콘 */}
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 ${philosophy.bgColor} rounded-xl`}>
                      <IconComponent className={`h-8 w-8 ${philosophy.color}`} />
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3 className="mb-3 text-center text-xl font-bold">{philosophy.title}</h3>

                  {/* 서브타이틀 */}
                  <p className={`mb-4 text-center font-medium ${philosophy.color}`}>
                    {philosophy.description}
                  </p>

                  {/* 상세 설명 */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {philosophy.detail}
                  </p>

                  {/* 인용구 */}
                  <div className="border-t border-border pt-4">
                    <p className={`text-center text-xs italic ${philosophy.color} opacity-70`}>
                      {philosophy.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 작업 프로세스 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            작업{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              프로세스
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            체계적이고 투명한 4단계 프로세스로
            <br className="hidden md:block" />
            <strong>성공적인 프로젝트</strong>를 만들어갑니다
          </p>
        </motion.div>

        {/* 프로세스 단계들 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                {/* 단계 번호 */}
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
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
                >
                  {process.step}
                </motion.div>

                {/* 제목 */}
                <h3 className="mb-3 text-xl font-bold">{process.title}</h3>

                {/* 설명 */}
                <p className="mb-6 leading-relaxed text-muted-foreground">{process.description}</p>

                {/* 작업 목록 */}
                <div className="space-y-2">
                  {process.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + taskIndex * 0.1 + 0.5,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center gap-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{task}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 연결선 (마지막 요소 제외) */}
              {index < workProcess.length - 1 && (
                <div className="absolute left-full top-8 hidden h-px w-8 bg-gradient-to-r from-primary to-transparent lg:block" />
              )}
            </motion.div>
          ))}
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
              함께 만들어가는 성공적인 프로젝트
            </h3>
            <p className="text-lg text-muted-foreground">
              기술적 전문성과 사람 중심의 소통으로
              <br className="hidden md:block" />
              여러분의 비전을 현실로 만들어보세요.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
