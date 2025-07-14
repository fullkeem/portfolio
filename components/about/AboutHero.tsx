'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Zap, Target } from 'lucide-react';

const stats = [
  { number: '1.2초', label: '평균 로딩 속도', icon: Zap },
  { number: '25%', label: '전환율 개선', icon: TrendingUp },
  { number: '95+', label: 'SEO 점수', icon: Target },
];

export function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="mb-6 text-3xl font-bold md:text-5xl">
            <span>단순히 페이지 제작을 넘어,</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              비즈니스 성장을 위한 디지털 경험 설계자가
            </span>
            <br />
            <span>되어 드리겠습니다.</span>
          </h1>

          <p className="mb-12 text-lg text-muted-foreground md:text-xl">
            데이터 기반 설계와 전환율 최적화로
            <br />
            고객의 비즈니스 성장을 함께 만들어갑니다.
          </p>

          {/* 핵심 성과 지표 */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`rounded-lg border border-border bg-background/50 p-6 transition-all duration-700 hover:scale-105 hover:shadow-lg ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary md:text-3xl">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              프로젝트 상담 받기
            </a>

            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-secondary"
            >
              성공 사례 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
