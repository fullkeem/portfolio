'use client';

import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_EMAIL,
  kakaoLink: process.env.NEXT_PUBLIC_KAKAO_LINK,
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};

const RAW_METHODS = [
  {
    icon: Mail,
    title: '이메일',
    description: '프로젝트 관련 상세한 문의사항',
    buildHref: (v: string) => `mailto:${v}`,
    label: '이메일 보내기',
    valueFromEnv: () => CONTACT_INFO.email,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    contactId: 'email',
  },
  {
    icon: MessageCircle,
    title: '카카오톡 오픈채팅',
    description: '빠른 상담 및 간단한 문의',
    buildHref: (v: string) => v,
    label: '오픈채팅 참여하기',
    valueFromEnv: () => CONTACT_INFO.kakaoLink,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    contactId: 'kakao',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: '포트폴리오 및 코드 확인',
    buildHref: (v: string) => v,
    label: 'GitHub 프로필 보기',
    valueFromEnv: () => CONTACT_INFO.github,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    contactId: 'github',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    description: '경력 및 네트워킹',
    buildHref: (v: string) => v,
    label: 'LinkedIn 프로필 보기',
    valueFromEnv: () => CONTACT_INFO.linkedin,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    contactId: 'linkedin',
  },
];

type BuiltMethod = {
  icon: typeof Mail;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  contactId: string;
  href: string;
  value: string;
  label: string;
};

export function ContactInfo() {
  const methods: BuiltMethod[] = RAW_METHODS.map((m) => {
    const value = m.valueFromEnv();
    if (!value) return null;
    return { ...m, href: m.buildHref(value), value, label: m.label } as BuiltMethod;
  }).filter((v): v is BuiltMethod => Boolean(v));

  if (methods.length === 0) return null;

  return (
    <section aria-labelledby="contact-title" className="bg-secondary/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 id="contact-title" className="mb-4 text-3xl font-bold md:text-4xl">
            Contact
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            아래 방법 중 편하신 방법으로 연락해 주세요
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {methods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Link
                key={method.contactId}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${method.title}로 연락하기`}
                data-contact={method.contactId}
                className="block rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${method.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">{method.title}</h3>
                    <p className="mb-3 text-muted-foreground">{method.description}</p>
                    <p className={`font-medium ${method.color}`}>{method.label}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
