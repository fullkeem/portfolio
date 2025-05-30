import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { QueryProvider } from '@/components/QueryProvider';
import { LenisProvider } from '@/components/LenisProvider';
import { PageTransition } from '@/components/common/PageTransition';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../public/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Frontend Developer | fullkeem',
    template: '%s | fullkeem',
  },
  icons: {
    icon: '/favicon.ico',
  },
  description:
    '랜딩 페이지 제작 전문 프론트엔드 개발자. 모던 웹 기술로 비즈니스 성장을 도와드립니다.',
  keywords: ['프론트엔드', '개발자', '랜딩페이지', '웹개발', 'React', 'Next.js'],
  authors: [{ name: 'fullkeem' }],
  creator: 'fullkeem',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://fullkeem.dev',
    siteName: 'fullkeem Portfolio',
    title: 'Frontend Developer | fullkeem',
    description: '랜딩 페이지 제작 전문 프론트엔드 개발자',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frontend Developer | fullkeem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Developer | fullkeem',
    description: '랜딩 페이지 제작 전문 프론트엔드 개발자',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <LenisProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <PageTransition>
                  <main className="flex-1">{children}</main>
                </PageTransition>
                <Footer />
              </div>
            </LenisProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
