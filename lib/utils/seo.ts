import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

/**
 * 페이지별 메타데이터 생성 헬퍼
 */
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  pathname = '',
}: GenerateMetadataProps = {}): Metadata {
  const url = `${siteConfig.url}${pathname}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [ogImage],
      creator: `@${siteConfig.creator}`,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * JSON-LD 구조화된 데이터 생성
 */
export function generateJsonLd(type: 'website' | 'article' | 'person', data?: Record<string, unknown>) {
  const baseData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'website':
      return {
        ...baseData,
        '@type': 'WebSite',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
          '@type': 'Person',
          name: siteConfig.creator,
        },
      };

    case 'article':
      return {
        ...baseData,
        '@type': 'BlogPosting',
        ...data,
      };

    case 'person':
      return {
        ...baseData,
        '@type': 'Person',
        name: siteConfig.creator,
        url: siteConfig.url,
        ...data,
      };

    default:
      return baseData;
  }
}
