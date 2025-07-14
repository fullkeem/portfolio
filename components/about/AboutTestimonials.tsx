'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, TrendingUp, Users, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const businessBenefits = [
  {
    icon: TrendingUp,
    title: '매출 증대',
    description: '전환율 최적화로 실제 매출 향상',
    metric: '평균 25% 향상',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Users,
    title: '고객 확보',
    description: 'SEO 최적화로 신규 고객 유입',
    metric: '검색 노출 3배 증가',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Award,
    title: '브랜드 신뢰도',
    description: '전문적인 디자인으로 신뢰성 구축',
    metric: '브랜드 인식 40% 향상',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: '경쟁력 확보',
    description: '빠른 로딩과 UX로 경쟁 우위',
    metric: 'Core Web Vitals 95+',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const trustFactors = [
  '✅ 100% 프로젝트 완료율',
  '✅ 평균 25% 전환율 향상',
  '✅ Lighthouse 95+ 점수 보장',
  '✅ 사후 지원 및 유지보수',
  '✅ 투명한 개발 프로세스',
  '✅ 데이터 기반 성과 측정',
];

export function AboutTestimonials() {
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  useEffect(() => {
    businessBenefits.forEach((_, index) => {
      setTimeout(() => {
        setVisibleBenefits((prev) => [...prev, index]);
      }, index * 200);
    });

    setTimeout(() => {
      setIsCtaVisible(true);
    }, 1200);
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            개발자가 아닌,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              비즈니스 파트너
            </span>
            입니다
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            단순히 코딩하는 개발자가 아니라, 고객의 비즈니스 성장을 함께 고민하고
            <br className="hidden md:block" />
            실제 매출 향상에 기여하는 <strong>비즈니스 파트너</strong>입니다.
          </p>
        </div>

        {/* 비즈니스 혜택 */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {businessBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const isVisible = visibleBenefits.includes(index);

            return (
              <div
                key={benefit.title}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-4 scale-95 opacity-0'
                }`}
              >
                <div
                  className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${benefit.bgColor} transition-all duration-300 hover:scale-110`}
                >
                  <IconComponent className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{benefit.description}</p>
                <div className={`text-sm font-bold ${benefit.color}`}>{benefit.metric}</div>
              </div>
            );
          })}
        </div>

        {/* 핵심 메시지 */}
        <div className="mb-16 text-center">
          <div className="mx-auto max-w-4xl rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">함께 성장하는 파트너십</h3>
            <p className="mb-6 text-lg text-muted-foreground">
              랜딩페이지는 단순한 웹사이트가 아닙니다. 고객의 비즈니스 목표를 달성하는 핵심
              도구입니다.
              <br className="hidden md:block" />
              저는 기술적 완성도뿐만 아니라 실제 비즈니스 성과에 집중합니다.
            </p>

            {/* 신뢰 요소 */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {trustFactors.map((factor, index) => (
                <div key={index} className="text-left text-sm text-muted-foreground">
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div
          className={`relative text-center transition-all duration-1000 ${
            isCtaVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            {/* Calling 이미지 */}
            <div className="absolute hidden md:left-4 md:top-5 md:block lg:left-12 lg:top-5 xl:left-20 xl:top-5">
              <div className="relative">
                <Image
                  src="/images/calling.png"
                  alt="프로젝트 시작하기"
                  width={80}
                  height={80}
                  className="h-16 w-16 drop-shadow-xl transition-transform duration-300 hover:scale-110 lg:h-20 lg:w-20"
                />
                <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 opacity-70 blur-lg" />
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              함께 만들어갈 첫 번째 성공 스토리
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              데이터 기반 분석과 최신 기술로 여러분만의 특별한 랜딩페이지를
              <br className="hidden md:block" />
              합리적인 가격에 정성껏 제작해드립니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                무료 상담 시작하기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-8 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary/80"
              >
                성공 사례 보기
              </Link>
            </div>

            {/* 추가 신뢰 배지 */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>무료 초기 상담</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>투명한 개발 과정</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>성과 보장 서비스</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>사후 지원 포함</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
