'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    rating: 5,
    content:
      '처음에는 웹사이트 제작이 어려울 줄 알았는데, fullkeem님께서 모든 과정을 쉽게 설명해주셔서 안심하고 진행할 수 있었습니다. 결과물도 기대 이상이었고, 고객들 반응도 정말 좋아요!',
    author: '김**님',
    project: '카페 홈페이지 제작',
    industry: '음식점 사업',
    date: '2024.11',
  },
  {
    rating: 5,
    content:
      '일정을 정확히 지켜주시고, 중간중간 진행상황을 계속 알려주셔서 믿고 맡길 수 있었습니다. 특히 SEO 최적화까지 해주셔서 검색에서 우리 업체가 잘 나와요.',
    author: '박**님',
    project: '부동산 중개 사이트',
    industry: '부동산 중개업',
    date: '2024.10',
  },
  {
    rating: 5,
    content:
      '복잡한 온라인 쇼핑몰 기능들을 완벽하게 구현해주셨어요. 관리자 페이지도 사용하기 편하게 만들어주시고, 사후관리도 꼼꼼히 해주셔서 감사합니다.',
    author: '이**님',
    project: '쇼핑몰 웹사이트',
    industry: '온라인 쇼핑몰',
    date: '2024.09',
  },
  {
    rating: 5,
    content:
      '기술적인 부분을 전혀 몰라도 차근차근 설명해주시고, 우리 병원 특성에 맞게 예약 시스템까지 완벽하게 만들어주셨어요. 환자분들이 사용하기 편하다고 하네요.',
    author: '최**님',
    project: '병원 예약 시스템',
    industry: '의료업',
    date: '2024.08',
  },
  {
    rating: 5,
    content:
      '디자인 센스도 뛰어나시고 기능도 완벽해요. 무엇보다 소통이 너무 편했습니다. 수정 요청에도 빠르게 대응해주시고, 정말 만족스러운 결과물이었습니다.',
    author: '정**님',
    project: '포트폴리오 웹사이트',
    industry: '디자인 스튜디오',
    date: '2024.07',
  },
  {
    rating: 5,
    content:
      '예산 안에서 최대한 좋은 결과물을 만들어주려고 노력해주셨어요. 작은 스타트업이라 부담스러웠는데, 합리적인 가격에 퀄리티 높은 웹사이트를 만들 수 있었습니다.',
    author: '한**님',
    project: '스타트업 랜딩 페이지',
    industry: 'IT 스타트업',
    date: '2024.06',
  },
];

const achievements = [
  {
    number: '50+',
    label: '완료 프로젝트',
    description: '다양한 업종의 성공적인 프로젝트',
  },
  {
    number: '5.0',
    label: '평균 평점',
    description: '모든 프로젝트 만점 평가',
  },
  {
    number: '98%',
    label: '재의뢰율',
    description: '높은 고객 만족도',
  },
  {
    number: '100%',
    label: '일정 준수',
    description: '약속된 납기 준수',
  },
];

export function AboutTestimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            고객{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              후기
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            실제 프로젝트를 함께한 고객들의
            <br className="hidden md:block" />
            <strong>진솔한 후기</strong>를 확인해보세요
          </p>
        </motion.div>

        {/* 성과 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {achievements.map((achievement, index) => (
            <div key={achievement.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  type: 'spring',
                  bounce: 0.4,
                }}
                viewport={{ once: true }}
                className="mb-2 text-4xl font-bold text-primary md:text-5xl"
              >
                {achievement.number}
              </motion.div>
              <div className="mb-1 text-lg font-semibold">{achievement.label}</div>
              <div className="text-sm text-muted-foreground">{achievement.description}</div>
            </div>
          ))}
        </motion.div>

        {/* 고객 후기 그리드 */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                {/* 인용 아이콘 */}
                <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
                  <Quote className="h-8 w-8 text-primary" />
                </div>

                {/* 별점 */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* 후기 내용 */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* 프로젝트 정보 */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{testimonial.project}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.industry} • {testimonial.date}
                  </div>
                </div>

                {/* 고객 정보 */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="text-sm font-medium">{testimonial.author}</div>
                  <div className="text-xs text-primary">크몽 프로젝트</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              다음 성공 스토리의 주인공은 바로 여러분입니다
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              지금까지 50여 개의 프로젝트를 성공적으로 완료하며 쌓아온
              <br className="hidden md:block" />
              경험과 노하우로 여러분의 프로젝트를 완성해보세요.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                더 많은 프로젝트 보기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-8 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary/80"
              >
                프로젝트 시작하기
              </Link>
            </div>

            {/* 신뢰 배지 */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% 고객 만족</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>무료 상담</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>사후 지원</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
