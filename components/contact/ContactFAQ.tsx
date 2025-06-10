'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '프로젝트 진행 기간은 얼마나 걸리나요?',
    answer:
      '프로젝트 규모와 복잡도에 따라 다르지만, 일반적으로 랜딩페이지는 1-2주, 기업 웹사이트는 2-4주, 복잡한 웹 애플리케이션은 4-8주 정도 소요됩니다. 정확한 일정은 요구사항 분석 후 협의를 통해 결정됩니다.',
  },
  {
    question: '프로젝트 비용은 어떻게 산정되나요?',
    answer:
      '페이지 수, 기능 복잡도, 디자인 요구사항, 일정 등을 종합적으로 고려하여 견적을 산출합니다. 초기 상담을 통해 대략적인 견적을 제공하고, 상세 기획 후 최종 견적을 확정합니다.',
  },
  {
    question: '반응형 디자인이 포함되나요?',
    answer:
      '네, 모든 프로젝트에서 모바일, 태블릿, 데스크톱에 최적화된 반응형 디자인을 기본으로 제공합니다. 모든 디바이스에서 일관된 사용자 경험을 보장합니다.',
  },
  {
    question: '프로젝트 완료 후 수정이 가능한가요?',
    answer:
      '프로젝트 완료 후 1개월간 무료 A/S를 제공합니다. 이후 수정이 필요한 경우 별도 협의를 통해 진행됩니다. 콘텐츠 관리 시스템(CMS)을 활용하여 직접 수정 가능한 구조로 개발할 수도 있습니다.',
  },
  {
    question: 'SEO 최적화도 포함되나요?',
    answer:
      '기본적인 SEO 설정(메타태그, 사이트맵, 로봇.txt 등)은 모든 프로젝트에 포함됩니다. 고급 SEO 최적화가 필요한 경우 별도 상담을 통해 진행할 수 있습니다.',
  },
  {
    question: '어떤 기술 스택을 사용하시나요?',
    answer:
      '주로 React, Next.js, TypeScript를 사용하며, 디자인은 Tailwind CSS, 애니메이션은 Framer Motion, GSAP 등을 활용합니다. 프로젝트 요구사항에 맞는 최적의 기술 스택을 선택하여 개발합니다.',
  },
  {
    question: '호스팅과 도메인 설정도 도와주시나요?',
    answer:
      '네, 필요시 호스팅 서비스 추천과 도메인 연결, SSL 인증서 설정 등을 지원합니다. Vercel, Netlify 등의 현대적인 호스팅 플랫폼을 주로 사용합니다.',
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-secondary/20 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">자주 묻는 질문</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            프로젝트 진행과 관련하여 자주 묻는 질문들을 정리했습니다
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="overflow-hidden rounded-lg border border-border bg-background">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-secondary/50"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="pr-4 text-lg font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-lg text-muted-foreground">다른 궁금한 점이 있으시나요?</p>
          <p className="text-sm text-muted-foreground">
            위의 연락 방법을 통해 언제든지 문의해 주세요. 친절하게 답변드리겠습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
