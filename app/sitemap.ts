import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // 정적 페이지들
  const staticPages = [
    '',
    '/about',
    '/portfolio',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: 동적 페이지들 (포트폴리오, 블로그 포스트) 추가
  // const portfolios = await getPortfolios();
  // const posts = await getBlogPosts();

  return [...staticPages];
}
