import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { BlogSection } from '@/components/home/BlogSection';
import { ContactSection } from '@/components/home/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  return (
    <>
      <JsonLd type="organization" />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
