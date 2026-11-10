import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// 번들 분석기 설정
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    disableStaticImages: false,
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/portfolio/22bc0a73-d8bb-8043-8fc2-c67b811c536c',
        destination: '/work/magplus',
        permanent: true,
      },
      {
        source: '/portfolio/201c0a73-d8bb-800f-ab33-c4a659b548e6',
        destination: '/work/shoong',
        permanent: true,
      },
      {
        source: '/portfolio/22bc0a73-d8bb-80e3-9fb9-edeae52458e4',
        destination: '/work/seoullette',
        permanent: true,
      },
      {
        source: '/portfolio/20fc0a73-d8bb-80e1-96b0-dbe7ccb7f0e5',
        destination: '/work/at-the-place',
        permanent: true,
      },
      {
        source: '/portfolio/201c0a73-d8bb-80fb-a10e-d88e3ae556be',
        destination: '/work/seojae-check',
        permanent: true,
      },
      {
        source: '/blog/SEO-AEO-GEO',
        destination: '/writing/seo-aeo-geo',
        permanent: true,
      },
      {
        source: '/posts/:path*',
        destination: '/writing/:path*',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/portfolio/:path*',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/writing/:path*',
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

const withMDX = createMDX({});

export default withBundleAnalyzer(withMDX(nextConfig));
