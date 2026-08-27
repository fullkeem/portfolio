import type { Metadata } from 'next';
import { profile } from '@/config/profile';
import { siteConfig } from '@/config/site';
import type { WorkMeta, WritingMeta } from '@/types/content';
import type { Locale } from '@/types/locale';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  pathname = '',
}: GenerateMetadataProps = {}): Metadata {
  const url = new URL(pathname || '/', siteConfig.url).toString();
  const resolvedTitle = title || siteConfig.name;
  const resolvedDescription = description || siteConfig.description;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: title || siteConfig.name,
    description: resolvedDescription,
    alternates: { canonical: url },
    robots: { index: !noIndex, follow: !noIndex },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
  };
}

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
      jobTitle: ['AX Developer', 'Frontend Developer', 'Educator'],
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
