import { MetadataRoute } from 'next';
import { getPortfolios, getBlogPosts } from '@/lib/notion/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    // 동적 페이지들 - 포트폴리오
    const portfolios = await getPortfolios();
    const portfolioPages = portfolios.map((portfolio) => ({
      url: `${baseUrl}/portfolio/${portfolio.id}`,
      lastModified: new Date(portfolio.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // 동적 페이지들 - 블로그 포스트
    const posts = await getBlogPosts();
    const blogPages = posts
      .filter(post => post.slug && post.title) // 유효한 포스트만
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    return [...staticPages, ...portfolioPages, ...blogPages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // 에러 시 정적 페이지만 반환
    return staticPages;
  }
}
