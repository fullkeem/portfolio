import { profile } from '@/config/profile';
import { siteConfig } from '@/config/site';
import type { WorkMeta, WritingMeta } from '@/types/content';
import type { Locale } from '@/types/locale';

export type JsonLdType = 'website' | 'person' | 'article' | 'portfolio';

export interface JsonLdInput {
  writing?: WritingMeta;
  work?: WorkMeta;
}

export function buildJsonLd(type: JsonLdType, data?: JsonLdInput, locale: Locale = 'ko') {
  const localePrefix = locale === 'en' ? '/en' : '';
  const person = {
    '@type': 'Person',
    name: locale === 'ko' ? profile.name : 'Kim Choongman',
    alternateName: profile.brandName,
    url: siteConfig.url,
  };

  if (type === 'website') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      inLanguage: 'ko-KR',
      author: person,
    };
  }

  if (type === 'person') {
    return {
      '@context': 'https://schema.org',
      ...person,
      jobTitle: 'Developer, AX Tutor/Mentor',
      sameAs: [profile.github, profile.linkedin],
    };
  }

  if (type === 'article' && data?.writing) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.writing.title,
      description: data.writing.summary,
      datePublished: data.writing.publishedAt,
      author: person,
      inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
      url: `${siteConfig.url}${localePrefix}/writing/${data.writing.slug}`,
    };
  }

  if (type === 'portfolio' && data?.work) {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: data.work.title,
      description: data.work.summary,
      creator: person,
      keywords: data.work.technologies.join(', '),
      inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
      url: `${siteConfig.url}${localePrefix}/work/${data.work.slug}`,
    };
  }

  return null;
}
