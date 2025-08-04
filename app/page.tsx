import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { BlogSection } from '@/components/home/BlogSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactInfo } from '@/components/home/ContactInfo';

export default function HomePage() {
  return (
    <>
      <JsonLd type="organization" />
      <HeroSection />
      <AboutSection />
      <ContactInfo />
      <PortfolioSection />
      <BlogSection />
    </>
  );
}
