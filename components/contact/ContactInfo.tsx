'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, Clock, MapPin } from 'lucide-react';

// TODO: 실제 연락처 정보로 업데이트 필요
const CONTACT_INFO = {
  email: 'your-email@example.com', // 실제 이메일로 변경
  kakaoLink: 'https://open.kakao.com/your-link', // 실제 카카오톡 오픈채팅 링크로 변경
  github: 'https://github.com/your-username', // 실제 GitHub 링크로 변경
  linkedin: 'https://linkedin.com/in/your-profile', // 실제 LinkedIn 링크로 변경
  responseTime: '24시간 이내', // 응답 시간
  location: '대한민국 서울', // 위치 정보
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

const additionalInfo = [
  {
    icon: Clock,
    title: '평균 응답 시간',
    value: CONTACT_INFO.responseTime,
  },
  {
    icon: MapPin,
    title: '위치',
    value: CONTACT_INFO.location,
  },
];

export function ContactInfo() {
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">연락 방법</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            아래 방법 중 편하신 방법으로 연락해 주세요
          </p>
        </motion.div>

        {/* 연락 방법 카드들 */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md"
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
              </motion.a>
            );
          })}
        </div>

        {/* 추가 정보 */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
          {additionalInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
              >
                <IconComponent className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{info.title}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 연락처 수정 안내 (개발자용) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl rounded-lg border border-primary/20 bg-primary/5 p-4"
        >
          <p className="text-center text-sm text-muted-foreground">
            <strong className="text-primary">개발자 노트:</strong>
            연락처 정보는{' '}
            <code className="rounded bg-muted px-1">components/contact/ContactInfo.tsx</code> 파일의
            <code className="rounded bg-muted px-1">CONTACT_INFO</code> 객체에서 수정할 수 있습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
