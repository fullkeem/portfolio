'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: '프로젝트 기간은 얼마나 걸리나요?',
    answer:
      '프로젝트 규모에 따라 다르지만, 일반적인 랜딩페이지는 2-3주 정도 소요됩니다. 단순한 페이지는 1주일, 복잡한 기능이 포함된 경우 4주까지 걸릴 수 있습니다. 정확한 일정은 상담 후 확정됩니다.',
  },
  {
    question: '프로젝트 비용은 어떻게 책정되나요?',
    answer:
      '페이지 수, 필요 기능, 디자인 복잡도에 따라 책정됩니다. 기본 랜딩페이지는 50만원부터 시작하며, 상담을 통해 정확한 견적을 제공해드립니다. 분할 결제도 가능합니다.',
  },
  {
    question: '수정은 몇 번까지 가능한가요?',
    answer:
      '디자인 단계에서 2회, 개발 완료 후 1회의 수정이 기본 포함됩니다. 추가 수정이 필요한 경우 별도 비용이 발생할 수 있으며, 경미한 수정은 무료로 지원해드립니다.',
  },
  {
    question: '어떤 기술로 개발하시나요?',
    answer:
      'Next.js, React, TypeScript를 주로 사용하며, 필요에 따라 다른 기술 스택도 활용합니다. 모든 사이트는 반응형으로 제작되며, SEO 최적화와 성능 최적화가 기본 포함됩니다.',
  },
  {
    question: '호스팅이나 도메인도 도와주시나요?',
    answer:
      '네, Vercel, Netlify 등의 호스팅 설정과 도메인 연결을 도와드립니다. 호스팅 비용은 별도이며, 관리 방법도 안내해드립니다. 필요시 유지보수 서비스도 제공합니다.',
  },
  {
    question: '사후 지원은 어떻게 이루어지나요?',
    answer:
      '프로젝트 완료 후 1개월간 무료 기술 지원을 제공합니다. 버그 수정, 간단한 콘텐츠 업데이트, 호스팅 관련 문제 해결 등을 도와드립니다. 이후 유지보수는 별도 계약으로 진행됩니다.',
  },
  {
    question: 'SEO나 성능 최적화도 포함되나요?',
    answer:
      '네, 모든 프로젝트에 기본 SEO 설정과 성능 최적화가 포함됩니다. 메타태그 설정, 구조화된 데이터, 이미지 최적화, Core Web Vitals 개선 등을 진행합니다.',
  },
  {
    question: '모바일 반응형은 기본 포함인가요?',
    answer:
      '네, 모든 사이트는 모바일 퍼스트로 개발되며 태블릿, 데스크톱까지 완벽하게 대응합니다. 다양한 디바이스에서 테스트를 거쳐 최적의 사용자 경험을 제공합니다.',
  },
];

export function ContactFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  return (
    <section className="bg-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">자주 묻는 질문</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            궁금한 점이 있으시면 아래 FAQ를 먼저 확인해보세요
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-border bg-background shadow-sm"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-secondary/50"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className="pr-4 text-lg font-semibold">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-content-${index}`}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="border-t border-border p-6">
                      <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 추가 문의 안내 */}
        <div className="mt-16 text-center">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 text-lg font-semibold text-primary">
              다른 궁금한 점이 있으신가요?
            </h3>
            <p className="mb-4 text-muted-foreground">
              위에서 답을 찾지 못하셨다면 언제든 연락해주세요
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                이메일로 문의하기
              </a>
              <a
                href={process.env.NEXT_PUBLIC_KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                카카오톡으로 상담하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
