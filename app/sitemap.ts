import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getWorkEntries, getWritingEntries } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/work', '/resume', '/writing'].flatMap((route) =>
    ['', '/en'].map((localePrefix) => ({
      url: `${siteConfig.url}${localePrefix}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
  const workPages = getWorkEntries().flatMap(({ metadata }) =>
    ['', '/en'].map((localePrefix) => ({
      url: `${siteConfig.url}${localePrefix}/work/${metadata.slug}`,
      lastModified: new Date(`${metadata.period}-01-01`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );
  const writingPages = getWritingEntries().flatMap(({ metadata }) =>
    ['', '/en'].map((localePrefix) => ({
      url: `${siteConfig.url}${localePrefix}/writing/${metadata.slug}`,
      lastModified: new Date(metadata.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...workPages, ...writingPages];
}
