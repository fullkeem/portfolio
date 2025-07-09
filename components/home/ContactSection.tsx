'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    title: '이메일로 문의하기',
    description: '프로젝트 의뢰나 협업 제안을 보내주세요',
    icon: Mail,
    href: 'mailto:your@email.com',
    action: '이메일 보내기',
  },
  {
    title: '카카오톡으로 문의하기',
    description: '빠른 상담을 원하시면 카톡으로 연락주세요',
    icon: MessageSquare,
    href: 'https://open.kakao.com/your-link',
    action: '카톡 상담하기',
  },
];

export function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-secondary/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold md:text-4xl">
            프로젝트를 시작해볼까요?
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-12 text-lg text-muted-foreground">
            랜딩 페이지 제작이 필요하시다면 편하게 연락주세요
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2">
            {contactMethods.map((method) => (
              <motion.div key={method.title} variants={itemVariants}>
                <Link
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border bg-background p-8 transition-all hover:bg-secondary/50"
                >
                  <method.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{method.title}</h3>
                  <p className="mb-4 text-muted-foreground">{method.description}</p>
                  <span className="inline-flex items-center font-medium text-primary group-hover:underline">
                    {method.action}
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-sm text-muted-foreground">
              또는{' '}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                문의 폼
              </Link>
              을 통해 자세한 내용을 남겨주세요
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
