'use client';

import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Award, CheckCircle, Code, Zap, Search, Shield } from 'lucide-react';

const performanceStats = [
  {
    icon: Clock,
    number: '1.2초',
    label: '평균 로딩 속도',
    description: 'Core Web Vitals 최적화',
    color: 'text-blue-500',
  },
  {
    icon: TrendingUp,
    number: '25%',
    label: '전환율 개선',
    description: 'CRO 최적화 평균 성과',
    color: 'text-green-500',
  },
  {
    icon: Award,
    number: '95+',
    label: 'Lighthouse 점수',
    description: '성능, 접근성, SEO 종합',
    color: 'text-purple-500',
  },
  {
    icon: CheckCircle,
    number: '100%',
    label: '고객 만족도',
    description: '프로젝트 완료율',
    color: 'text-red-500',
  },
];

const techStack = [
  {
    category: '개발 스택',
    icon: Code,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    technologies: [
      'Next.js 15 + TypeScript',
      'Tailwind CSS + Radix UI',
      'React 18 + Server Components',
      'Prisma + PostgreSQL',
    ],
  },
  {
    category: '성능 최적화',
    icon: Zap,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    technologies: [
      'Core Web Vitals 최적화',
      'Image Optimization (AVIF/WebP)',
      'Code Splitting & Lazy Loading',
      'CDN + Edge Computing',
    ],
  },
  {
    category: 'AEO & 분석',
    icon: Search,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    technologies: [
      'Schema Markup (JSON-LD)',
      'Google Analytics 4',
      'Google Tag Manager',
      'Search Console 최적화',
    ],
  },
  {
    category: '보안 & 배포',
    icon: Shield,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    technologies: [
      'HTTPS + SSL 인증서',
      'Vercel + Cloudflare',
      'Environment Variables',
      'CI/CD Pipeline',
    ],
  },
];

const certifications = [
  '✅ WCAG 2.1 AA 접근성 준수',
  '✅ Web Performance 전문성',
  '✅ Google Analytics 인증',
  '✅ Next.js 15 최신 기술 활용',
];

export function AboutCredibility() {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleTech, setVisibleTech] = useState<number[]>([]);

  useEffect(() => {
    // 성과 통계 애니메이션
    performanceStats.forEach((_, index) => {
      setTimeout(() => {
        setVisibleStats((prev) => [...prev, index]);
      }, index * 150);
    });

    // 기술 스택 애니메이션
    setTimeout(() => {
      techStack.forEach((_, index) => {
        setTimeout(() => {
          setVisibleTech((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 800);
  }, []);

  return (
    <section className="bg-secondary/30 py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="relative mb-20 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              실제 성과로 증명하는 실력
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            이 포트폴리오 사이트가 바로 제 실력의 증명입니다
            <br className="hidden md:block" />
            <strong>데이터와 기술로 검증된 성과</strong>
          </p>
        </div>

        {/* 성과 통계 */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {performanceStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isVisible = visibleStats.includes(index);

            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-4 scale-95 opacity-0'
                }`}
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:scale-110">
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`mb-2 text-3xl font-bold ${stat.color} md:text-4xl`}>
                  {stat.number}
                </div>
                <div className="mb-1 text-sm font-semibold">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* 기술 스택 */}
        <div className="mb-16">
          <h3 className="mb-12 text-center text-2xl font-bold md:text-3xl">사용 기술 스택</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              const isVisible = visibleTech.includes(index);

              return (
                <div
                  key={tech.category}
                  className={`rounded-lg border ${tech.borderColor} ${tech.bgColor} p-6 transition-all duration-700 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`rounded-full ${tech.bgColor} p-2`}>
                      <IconComponent className={`h-6 w-6 ${tech.color}`} />
                    </div>
                    <h4 className="text-lg font-semibold">{tech.category}</h4>
                  </div>
                  <div className="space-y-2">
                    {tech.technologies.map((technology, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${tech.color.replace('text-', 'bg-')}`}
                        />
                        {technology}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 인증 및 자격 */}
        <div className="mb-16 text-center">
          <h3 className="mb-8 text-2xl font-bold md:text-3xl">전문성 인증</h3>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg bg-background/50 p-4 text-left transition-all duration-300 hover:bg-background"
              >
                <span className="text-sm text-muted-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 포트폴리오 증명 */}
        <div className="text-center">
          <div className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <h3 className="mb-4 text-2xl font-bold">이 사이트가 바로 실력의 증명</h3>
            <p className="mb-6 text-lg text-muted-foreground">
              말로만 하는 것이 아닌, 실제 구현된 이 포트폴리오 사이트에서
              <br className="hidden md:block" />제 개발 실력과 최적화 능력을 직접 경험해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-green-600">
                Lighthouse 95+ 점수
              </span>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-600">
                Core Web Vitals 모두 녹색
              </span>
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-purple-600">
                완벽한 접근성 구현
              </span>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-600">
                SEO 100점 달성
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
