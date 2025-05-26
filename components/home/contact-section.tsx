"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    title: "이메일로 문의하기",
    description: "프로젝트 의뢰나 협업 제안을 보내주세요",
    icon: Mail,
    href: "mailto:your@email.com",
    action: "이메일 보내기",
  },
  {
    title: "카카오톡으로 문의하기",
    description: "빠른 상담을 원하시면 카톡으로 연락주세요",
    icon: MessageSquare,
    href: "https://open.kakao.com/your-link",
    action: "카톡 상담하기",
  },
];

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            프로젝트를 시작해볼까요?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            랜딩 페이지 제작이 필요하시다면 편하게 연락주세요
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 rounded-lg border bg-background hover:bg-secondary/50 transition-all group"
                >
                  <method.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                    {method.action}
                    <svg
                      className="w-4 h-4 ml-2"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <p className="text-sm text-muted-foreground">
              또는{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
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
