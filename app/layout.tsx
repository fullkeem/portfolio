import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { QueryProvider } from "@/components/QueryProvider";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Fullkeem.log",
    template: "%s | Fullkeem.log",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "프론트엔드 개발자 포트폴리오. 랜딩 페이지 제작 전문, React, Next.js, TypeScript",
  keywords: [
    "프론트엔드",
    "개발자",
    "포트폴리오",
    "랜딩페이지",
    "React",
    "Next.js",
  ],
  authors: [{ name: "fullkeem" }],
  creator: "fullkeem",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://fullkeem.log",
    siteName: "Fullkeem.log",
    title: "Fullkeem.log",
    description: "프론트엔드 개발자 포트폴리오. 랜딩 페이지 제작 전문",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fullkeem.log",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullkeem.log",
    description: "프론트엔드 개발자 포트폴리오. 랜딩 페이지 제작 전문",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <body
        className={`${pretendard.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <LenisProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </LenisProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
