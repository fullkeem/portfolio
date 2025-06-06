import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // 타임아웃 및 성능 개선 설정
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    domains: [], // remotePatterns 사용 권장
  },
  // 성능 최적화 설정
  compress: true,
  swcMinify: true,
  // Bundle Analyzer (개발 시 사용)
  // ...(process.env.ANALYZE === 'true' && { webpack: (config) => {
  //   config.plugins.push(new BundleAnalyzerPlugin())
  //   return config
  // }}),
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // 정적 파일 압축
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' giscus.app *.github.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app *.github.com;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/posts/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
