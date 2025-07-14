'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Zap, Target, Search, TrendingUp } from 'lucide-react';

const differentiators = [
  {
    number: '01',
    icon: BarChart3,
    title: 'AEO 중심 설계',
    subtitle: '집단 헤드라인 + FAQ 스키마로 AI 답변 카드(SGE·네이버 AIR) 선점',
    features: [
      '키워드만 맞춰서 SEO 태그 삽입',
      '구조화된 데이터 완벽 구현',
      'Google AI 답변에 노출되는 컨텐츠 설계',
      '검색 의도 기반 페이지 구조화',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    number: '02',
    icon: Zap,
    title: 'AI 자동화 퍼널',
    subtitle: 'Gemini Flash·LangGraph로 카피·FAQ·A/B 변수를 1분 생성',
    features: [
      '수작업 카피 → 수정 반복',
      '제작 시간 50%↓, 초기 버전 이후 나와 테스트 즉시 가짜',
      'A/B 테스트용 변형 자동 생성',
      '타겟별 맞춤형 메시지 최적화',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    number: '03',
    icon: Target,
    title: 'CO-STAR 브리프',
    subtitle: '맥락·목표·톤을 구조화 → 디자인·코드 전 과정 한 파이프라인',
    features: [
      '기획·디자인·개발이 분리되던 절차 소실 방식',
      '체계적인 브랜드 일관성 유지',
      '한 사람이 처음부터 끝까지 책임, 수정 사이클 최소화',
      '프로젝트 전체 맥락 이해',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Core Web Vitals 가드',
    subtitle: 'Next.js 15 + Tailwind로 LCP < 3s / INP < 200ms 보장',
    features: [
      '감당형만 강조, 속도는 뒷전',
      '모바일 이탈률 ↓ → 전환율 ↑',
      '실시간 성능 모니터링',
      '페이지별 최적화 전략 수립',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    number: '05',
    icon: Search,
    title: '자동 진단 & 보고',
    subtitle: '무료 AEO 진단 PDF + GA4 서비 태킹 + 월간 리포트',
    features: [
      '결과 지표 제공 X',
      '고객이 수치로 효과를 확인 → 재계약 ↑',
      '데이터 기반 개선 제안',
      '투명한 성과 공유',
    ],
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
];

export function AboutProblemSolution() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    differentiators.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            최신 트렌드를 반영한 랜딩 페이지 제작 <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              차별점 5가지
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            AI 검색 시대에 맞춘 AEO 설계 + AI 자동화 제작 + 속도 최적화 + 데이터 리포트
          </p>
        </div>

        {/* 차별점 목록 */}
        <div className="space-y-12">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon;
            const isVisible = visibleItems.includes(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.number}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* 컨텐츠 */}
                <div className={`flex-1 space-y-6 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                  <div
                    className={`flex items-start gap-4 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className={`text-6xl font-bold ${item.color} opacity-20`}>
                      {item.number}
                    </div>
                    <div className={isEven ? 'lg:text-left' : 'lg:text-right'}>
                      <h3 className="mb-2 text-2xl font-bold md:text-3xl">{item.title}</h3>
                      <p className="text-lg text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`flex items-start gap-3 rounded-lg bg-background/50 p-3 transition-all duration-300 hover:bg-background ${
                          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                        }`}
                      >
                        <div
                          className={`mt-1 h-2 w-2 rounded-full ${item.bgColor} flex-shrink-0`}
                        />
                        <span
                          className={`text-sm text-muted-foreground ${isEven ? 'lg:text-left' : 'lg:text-right'}`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 아이콘 영역 */}
                <div className="hidden flex-shrink-0 lg:block">
                  <div
                    className={`flex h-32 w-32 items-center justify-center rounded-2xl border-2 ${item.borderColor} ${item.bgColor} transition-all duration-500 hover:scale-110`}
                  >
                    <IconComponent className={`h-16 w-16 ${item.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 강조 메시지 */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <h3 className="mb-4 text-2xl font-bold">한 줄 정리</h3>
            <p className="text-lg text-muted-foreground">
              &ldquo;AI 검색 시대에 맞춘 AEO 설계 + AI 자동화 제작 + 속도 최적화 + 데이터
              리포트&rdquo; - <br className="hidden md:block" />이 풀세트를 1인 개발자가 한 번에
              제공하는 것이 내 서비스만의 강력한 차별점입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
