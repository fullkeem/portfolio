import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SkipLink } from '@/components/common/SkipLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { localeInitScript } from '@/config/i18n';
import { siteConfig } from '@/config/site';
import { themeInitScript } from '@/config/theme';
// Pretendard dynamic subset: each page downloads only the unicode-range chunks it renders (next/font/local can't split by range).
import '../public/fonts/pretendard/pretendardvariable-dynamic-subset.css';
import './globals.css';
import './deck.css';
import './content-theme.css';

const jetbrainsMono = localFont({
  src: '../public/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-mono',
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
  // No title/description/url here: child pages inherit this object whole, so each page's own title/description must flow in and a shared url would point every page at home.
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
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
    <html lang="ko" data-scroll-behavior="smooth" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
        <JsonLd type="website" />
        <JsonLd type="person" />
      </head>
      <body className={jetbrainsMono.variable}>
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
