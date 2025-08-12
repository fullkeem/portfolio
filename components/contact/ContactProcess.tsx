'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Lightbulb, Code, Rocket } from 'lucide-react';

const processSteps = [
  {
    icon: MessageSquare,
    title: '상담 및 요구사항 분석',
    duration: '1-2일',
    description: '프로젝트 목표, 타겟 고객, 필요 기능 등을 상세히 분석합니다.',
    deliverables: ['요구사항 정의서', '프로젝트 범위 확정', '예산 및 일정 수립'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Lightbulb,
    title: '기획 및 디자인 제안',
    duration: '1-2일',
    description: '사용자 경험을 고려한 와이어프레임과 디자인 시안을 제작합니다.',
    deliverables: ['와이어프레임', '디자인 시안', 'UI/UX 가이드라인'],
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    icon: Code,
    title: '개발 및 테스트',
    duration: '2-3일',
    description: '최신 기술 스택으로 개발하고 다양한 디바이스에서 테스트합니다.',
    deliverables: ['반응형 웹사이트', '성능 최적화', '크로스 브라우저 테스트'],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    icon: Rocket,
    title: '배포 및 사후 지원',
    duration: '1-2일',
    description: '도메인 연결, SEO 설정, 그리고 지속적인 사후 지원을 제공합니다.',
    deliverables: ['사이트 배포', 'SEO 최적화', '운영 가이드 제공'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
];

export function ContactProcess() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleSteps([0, 1, 2, 3]);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">프로젝트 진행 프로세스</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            체계적인 프로세스로 고품질의 페이지를 제작합니다
          </p>
        </div>

        {/* 프로세스 단계들 */}
        <div className="mx-auto max-w-4xl">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isVisible = visibleSteps.includes(index);

            return (
              <div key={step.title} className="relative">
                <div
                  className={`relative z-10 mb-12 transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* 아이콘 및 단계 번호 */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${step.borderColor} ${step.bgColor} md:h-16 md:w-16`}
                      >
                        <IconComponent className={`h-6 w-6 ${step.color} md:h-8 md:w-8`} />
                      </div>
                      <div className="text-sm font-medium text-muted-foreground md:text-center">
                        Step {index + 1}
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1 rounded-lg border border-border bg-background p-6 shadow-sm">
                      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${step.bgColor} ${step.color}`}
                        >
                          {step.duration}
                        </span>
                      </div>

                      <p className="mb-4 text-muted-foreground">{step.description}</p>

                      <div>
                        <h4 className="mb-2 text-sm font-medium text-foreground">주요 산출물:</h4>
                        <ul className="space-y-1">
                          {step.deliverables.map((deliverable, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <div
                                className={`h-1.5 w-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`}
                              ></div>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 총 예상 기간 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-3">
            <span className="text-sm font-medium text-primary">총 예상 기간:</span>
            <span className="text-lg font-bold text-primary">1-2주</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            프로젝트 규모에 따라 일정이 조정될 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
