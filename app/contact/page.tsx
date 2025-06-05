import type { Metadata } from 'next';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactFAQ } from '@/components/contact/ContactFAQ';
import { ContactProcess } from '@/components/contact/ContactProcess';

export const metadata: Metadata = {
  title: 'Contact',
  description: '프로젝트 문의 및 연락처 정보를 확인하세요. 랜딩페이지 제작 관련 문의를 환영합니다.',
  openGraph: {
    title: 'Contact | fullkeem',
    description: '프로젝트 문의 및 연락처 정보',
  },
  twitter: {
    title: 'Contact | fullkeem',
    description: '프로젝트 문의 및 연락처 정보',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
    </div>
  );
}
