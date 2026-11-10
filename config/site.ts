export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '김충만 · Fullkeem',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    '제품 개발과 AX 교육·멘토링을 수행하는 김충만(Fullkeem)의 포트폴리오. 프로젝트, 개발 역량, 기업교육·PBL·해커톤 활동을 확인하세요.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fullkeem.kr',
  ogImage: '/opengraph-image',
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
