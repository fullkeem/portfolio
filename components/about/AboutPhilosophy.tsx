'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Clock, Palette, Zap, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

// 각 철학에 맞는 기술 스택 매핑
const philosophiesWithTech = [
  {
    icon: MessageCircle,
    title: '소통 우선',
    description: '기술적 용어보다 이해하기 쉬운 말로',
    detail:
      '복잡한 개발 과정을 고객이 이해할 수 있도록 쉽게 설명하고, 단계별 진행 상황을 투명하게 공유합니다.',
    techStack: ['TypeScript', 'ESLint'],
    techDetail:
      'TypeScript의 명확한 타입 시스템으로 안정적이고 이해하기 쉬운 코드 구조를 만듭니다.',
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
    techStack: ['Git', 'Vercel'],
    techDetail: 'Git으로 체계적인 버전 관리, Vercel로 빠른 배포와 실시간 프리뷰를 제공합니다.',
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
    techStack: ['Tailwind CSS', 'Framer Motion'],
    techDetail:
      'Tailwind CSS로 일관된 디자인 시스템, Framer Motion으로 부드러운 인터랙션을 구현합니다.',
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
    techStack: ['Next.js', 'React'],
    techDetail:
      'Next.js의 SSR/SSG로 초고속 로딩, React 18의 최신 기능으로 효율적인 렌더링을 구현합니다.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    quote: '"속도는 곧 사용자 만족도입니다"',
  },
  {
    icon: Shield,
    title: '안정성 보장',
    description: '견고하고 안전한 코드 구조',
    detail: '코드 리뷰, 테스트, 보안 검증을 통해 안정적이고 유지보수가 쉬운 웹사이트를 만듭니다.',
    techStack: ['Jest', 'Prettier'],
    techDetail: 'Jest로 안정적인 테스트, Prettier로 일관된 코드 스타일을 유지합니다.',
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
    techStack: ['GitHub', 'Notion API'],
    techDetail: 'GitHub로 코드 관리와 이슈 트래킹, Notion API로 쉬운 콘텐츠 업데이트를 지원합니다.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    quote: '"좋은 관계는 프로젝트를 넘어서 계속됩니다"',
  },
];

// ... (workProcess 배열은 동일하게 유지)

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

        {/* 철학 카드들 - 기술 스택 추가 */}
        <div className="relative mb-32 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {philosophiesWithTech.map((philosophy, index) => {
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

                  {/* 기술 스택 태그 */}
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {philosophy.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${philosophy.bgColor} ${philosophy.color}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 기술 설명 */}
                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                    {philosophy.techDetail}
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

        {/* 기술 스택 요약 섹션 추가 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <div className="mx-auto max-w-4xl rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8">
            <h3 className="mb-6 text-2xl font-bold">
              최신 기술 스택으로 <span className="text-primary">완성도 높은</span> 결과물을 만듭니다
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <h4 className="mb-2 font-semibold text-primary">Frontend</h4>
                <p className="text-sm text-muted-foreground">React, Next.js, TypeScript</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">Styling</h4>
                <p className="text-sm text-muted-foreground">Tailwind CSS, CSS Modules</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">Animation</h4>
                <p className="text-sm text-muted-foreground">GSAP, Framer Motion</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">Tools</h4>
                <p className="text-sm text-muted-foreground">Git, Vercel, Notion API</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 작업 프로세스 섹션은 동일하게 유지 */}
        {/* ... */}
      </div>
    </section>
  );
}
