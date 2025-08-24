import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { BlogSection } from '@/components/home/BlogSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getTopPortfolios, getTopPosts } from '@/lib/notion/repo';

export const revalidate = 60;
export const runtime = 'nodejs';

export default async function HomePage() {
  const [portfolios, posts] = await Promise.all([getTopPortfolios(3), getTopPosts(3)]);

  return (
    <>
      <JsonLd type="organization" />
      <HeroSection />
      <AboutSection />
      <PortfolioSection items={portfolios} />
      <BlogSection posts={posts} />
    </>
  );
}
