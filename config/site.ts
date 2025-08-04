export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'fullkeem',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '프론트엔드 개발자 포트폴리오',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    email: process.env.NEXT_PUBLIC_EMAIL || '',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
    kakao: process.env.NEXT_PUBLIC_KAKAO_LINK || '',
  },
  creator: 'fullkeem',
  keywords: [
    '프론트엔드',
    '개발자',
    '포트폴리오',
    '랜딩페이지',
    'React',
    'Next.js',
    'TypeScript',
    '웹개발',
  ],
};

export type SiteConfig = typeof siteConfig;
