export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '김충만 · Fullkeem',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'AX 개발, 프론트엔드 구현, 기업교육과 PBL·해커톤 멘토링을 연결하는 김충만(Fullkeem)의 이력·포트폴리오.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-fullkeems-projects.vercel.app',
  ogImage: '/opengraph-image',
  links: {
    email: process.env.NEXT_PUBLIC_EMAIL || 'mailto:cm7307@kakao.com',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/fullkeem',
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      'https://www.linkedin.com/in/%EC%B6%A9%EB%A7%8C-%EA%B9%80-11b378305/',
    kakao: process.env.NEXT_PUBLIC_KAKAO_LINK || '',
  },
  creator: '김충만 (Fullkeem)',
  keywords: [
    '프론트엔드',
    '개발자',
    '포트폴리오',
    'AX 개발',
    '기업교육',
    'PBL 멘토',
    '해커톤 멘토',
    'React',
    'Next.js',
    'TypeScript',
    '웹개발',
  ],
};

export type SiteConfig = typeof siteConfig;
