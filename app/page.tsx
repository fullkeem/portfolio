import { HeroSection } from '@/components/home/HeroSection';
import { JsonLd } from '@/components/seo/JsonLd';
import dynamic from 'next/dynamic';

// GSAP을 사용하는 AboutSection을 동적 로드 (Below-fold이므로 안전)
const AboutSection = dynamic(
  () => import('@/components/home/AboutSection').then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="mx-auto h-8 w-48 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 rounded bg-gray-200 dark:bg-gray-800"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

// PortfolioSection을 동적 로드 (이미지 최적화 로직으로 인한 번들 크기 최적화)
const PortfolioSection = dynamic(
  () =>
    import('@/components/home/PortfolioSection').then((mod) => ({ default: mod.PortfolioSection })),
  {
    loading: () => (
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="mx-auto h-8 w-48 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border bg-background p-0">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-800"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto h-10 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </div>
      </section>
    ),
  }
);

// BlogSection을 동적 로드 (이미지 최적화 로직으로 인한 번들 크기 최적화)
const BlogSection = dynamic(
  () => import('@/components/home/BlogSection').then((mod) => ({ default: mod.BlogSection })),
  {
    loading: () => (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="mx-auto h-8 w-48 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border bg-background p-0">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto h-10 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </div>
      </section>
    ),
  }
);

// ContactSection을 동적 로드 (Below-fold 컴포넌트로 번들 크기 최적화)
const ContactSection = dynamic(
  () => import('@/components/home/ContactSection').then((mod) => ({ default: mod.ContactSection })),
  {
    loading: () => (
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-pulse space-y-8">
              <div className="mx-auto h-8 w-64 rounded bg-gray-200 dark:bg-gray-800"></div>
              <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-800"></div>
              <div className="grid gap-8 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-lg border bg-background p-8">
                    <div className="mx-auto mb-4 h-12 w-12 rounded bg-gray-200 dark:bg-gray-800"></div>
                    <div className="space-y-3">
                      <div className="mx-auto h-6 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="mx-auto h-4 w-48 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="mx-auto h-4 w-24 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mx-auto h-4 w-64 rounded bg-gray-200 dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

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
