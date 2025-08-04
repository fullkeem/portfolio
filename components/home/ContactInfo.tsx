'use client';

import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';

const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_EMAIL,
  kakaoLink: process.env.NEXT_PUBLIC_KAKAO_LINK,
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};

const contactMethods = [
  {
    icon: Mail,
    title: '이메일',
    description: '프로젝트 관련 상세한 문의사항',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: MessageCircle,
    title: '카카오톡 오픈채팅',
    description: '빠른 상담 및 간단한 문의',
    value: '오픈채팅 참여하기',
    href: CONTACT_INFO.kakaoLink,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: '포트폴리오 및 코드 확인',
    value: '프로필 보기',
    href: CONTACT_INFO.github,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    description: '경력 및 네트워킹',
    value: '프로필 보기',
    href: CONTACT_INFO.linkedin,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
  },
];

export function ContactInfo() {
  return (
    <section className="bg-secondary/20 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Contact</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            아래 방법 중 편하신 방법으로 연락해 주세요
          </p>
        </div>

        {/* 연락 방법 카드들 */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contactMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${method.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">{method.title}</h3>
                    <p className="mb-3 text-muted-foreground">{method.description}</p>
                    <p className={`font-medium ${method.color}`}>{method.value}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
