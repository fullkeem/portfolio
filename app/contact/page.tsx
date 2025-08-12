import type { Metadata } from 'next';
import { ContactInfo } from '@/components/home/ContactInfo';
import { ContactProcess } from '@/components/contact/ContactProcess';
import { ContactFAQ } from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact | fullkeem',
  description: '프로젝트 문의 및 연락처 정보를 확인하세요. 랜딩페이지 제작 관련 문의를 환영합니다.',
  keywords: ['프로젝트 문의', '랜딩페이지 제작', '웹 개발', '상담', 'fullkeem'],
  openGraph: {
    title: 'Contact | fullkeem',
    description: '프로젝트 문의 및 연락처 정보',
    type: 'website',
  },
  twitter: {
    title: 'Contact | fullkeem',
    description: '프로젝트 문의 및 연락처 정보',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactInfo />
      <ContactProcess />
      <ContactFAQ />
    </div>
  );
}
