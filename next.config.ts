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
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
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
