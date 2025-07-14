'use client';

import { useState, useEffect } from 'react';
import { Search, Target, Palette, Code, TestTube, BarChart } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: Search,
    title: '비즈니스 분석 & 타겟 정의',
    description: '고객의 비즈니스 목표와 타겟 고객을 명확히 정의합니다',
    details: [
      '경쟁사 분석 및 벤치마킹',
      '타겟 페르소나 설정',
      '비즈니스 목표 및 KPI 정의',
      '예산 및 일정 계획 수립',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    duration: '1-2일',
  },
  {
    step: '02',
    icon: Target,
    title: '전환 목표 설정 & KPI 정의',
    description: '구체적인 성과 지표와 전환 목표를 설정합니다',
    details: [
      '주요 전환 포인트 식별',
      '측정 가능한 KPI 설정',
      'GA4 및 GTM 설정 계획',
      'A/B 테스트 전략 수립',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    duration: '1일',
  },
  {
    step: '03',
    icon: Palette,
    title: '와이어프레임 & UX 설계',
    description: '사용자 경험을 중심으로 한 페이지 구조를 설계합니다',
    details: ['사용자 여정 맵핑', '정보 구조 설계', '와이어프레임 제작', 'CRO 최적화 적용'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    duration: '2-3일',
  },
  {
    step: '04',
    icon: Code,
    title: '퍼포먼스 최적화 개발',
    description: 'Next.js 15와 최신 기술로 고성능 랜딩페이지를 구현합니다',
    details: [
      'Next.js 15 + TypeScript 개발',
      'Core Web Vitals 최적화',
      'SEO & AEO 완벽 구현',
      '반응형 & 접근성 준수',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    duration: '3-5일',
  },
  {
    step: '05',
    icon: TestTube,
    title: 'A/B 테스트 & 데이터 분석',
    description: '실제 사용자 데이터를 기반으로 성과를 측정하고 개선합니다',
    details: ['A/B 테스트 설정 및 실행', '사용자 행동 분석', '전환율 최적화', '성과 데이터 수집'],
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    duration: '1-2주',
  },
  {
    step: '06',
    icon: BarChart,
    title: '사후 지원 & 성과 모니터링',
    description: '지속적인 성과 모니터링과 개선 제안을 제공합니다',
    details: [
      '월간 성과 리포트 제공',
      '개선 사항 제안',
      '기술 지원 및 유지보수',
      '장기적 성장 전략 수립',
    ],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    duration: '지속적',
  },
];

export function AboutPhilosophy() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    processSteps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, index]);
      }, index * 300);
    });
  }, []);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              체계적인{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                제작 프로세스
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              데이터 기반 분석부터 지속적인 성과 모니터링까지
              <br className="hidden md:block" />
              6단계 프로세스로 성공적인 랜딩페이지를 만들어갑니다.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = visibleSteps.includes(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {/* 프로세스 콘텐츠 */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl font-bold ${step.color} opacity-30`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-bold md:text-2xl">{step.title}</h3>
                          <span
                            className={`rounded-full ${step.bgColor} px-3 py-1 text-xs font-medium ${step.color}`}
                          >
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    <div className="ml-12 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center gap-3 rounded-lg bg-background/50 p-3 transition-all duration-300 hover:bg-background"
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${step.color.replace('text-', 'bg-')}`}
                          />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 프로세스 아이콘 */}
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-2xl border-2 ${step.borderColor} ${step.bgColor} transition-all duration-500 hover:scale-110`}
                    >
                      <IconComponent className={`h-12 w-12 ${step.color}`} />
                    </div>
                  </div>

                  {/* 연결선 (마지막 단계 제외) */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-1/2 mt-16 hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-border to-transparent lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          {/* 프로세스 요약 */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
              <h3 className="mb-4 text-2xl font-bold">투명하고 체계적인 진행</h3>
              <p className="text-lg text-muted-foreground">
                각 단계별로 명확한 결과물과 피드백을 제공하여
                <br className="hidden md:block" />
                고객이 프로젝트 진행 상황을 실시간으로 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
