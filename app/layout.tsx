import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SkipLink } from '@/components/common/SkipLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../public/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-mono',
  display: 'swap',
});

const zenSerif = localFont({
  src: '../public/fonts/ZEN-SERIF-Regular.woff2',
  variable: '--font-zen-serif',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    languages: { ko: '/', en: '/en' },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <JsonLd type="website" />
        <JsonLd type="person" />
      </head>
      <body className={`${pretendard.variable} ${jetbrainsMono.variable} ${zenSerif.variable}`}>
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
