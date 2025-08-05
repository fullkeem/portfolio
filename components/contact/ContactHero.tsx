'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Star } from 'lucide-react';

const stats = [
  { number: '24시간', label: '평균 응답 시간', icon: Clock },
  { number: '100%', label: '프로젝트 완료율', icon: CheckCircle },
  { number: '4.9/5.0', label: '고객 만족도', icon: Star },
];

export function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = (method: string) => {
    const element = document.querySelector(`[data-contact="${method}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/20" />
      <div className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="mb-6 text-3xl font-bold md:text-5xl">
            <span>프로젝트 문의하기</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              성공적인 랜딩페이지 제작을 위한
            </span>
            <br />
            <span>첫 걸음을 함께 시작해보세요</span>
          </h1>

          <p className="mb-12 text-lg text-muted-foreground md:text-xl">
            빠른 응답과 전문적인 상담으로
            <br />
            여러분의 비즈니스 성장을 도와드리겠습니다
          </p>

          {/* 핵심 통계 */}
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

          {/* CTA 버튼들 */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => scrollToContact('email')}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              이메일로 문의하기
            </button>

            <button
              onClick={() => scrollToContact('kakao')}
              className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-secondary"
            >
              카카오톡 상담하기
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            문의 후 24시간 이내에 상세한 답변을 드립니다
          </p>
        </div>
      </div>
    </section>
  );
}
