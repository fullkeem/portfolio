import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import type { Portfolio, BlogPost } from '@/types';
import type {
  WithContext,
  WebSite,
  Person,
  BlogPosting,
  CreativeWork,
  Organization,
  ProfessionalService,
  ContactPage,
  ItemList,
  Blog,
} from 'schema-dts';

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

// --------------------
// JSON-LD Builders
// --------------------

export type JsonLdType =
  | 'website'
  | 'person'
  | 'article'
  | 'portfolio'
  | 'organization'
  | 'professional-service'
  | 'contact-page'
  | 'item-list'
  | 'blog-list';

export interface JsonLdInput {
  blogPost?: BlogPost;
  portfolio?: Portfolio;
  listName?: string;
  items?: Array<{ id: string; title: string; description?: string; url?: string }>;
  totalItems?: number;
  url?: string;
}

function buildWebsiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: { '@type': 'Person', name: siteConfig.creator },
  };
}

function buildPersonJsonLd(): WithContext<Person> {
  const sameAs = Object.values(siteConfig.links).filter(Boolean) as string[];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.creator,
    url: siteConfig.url,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function buildOrganizationJsonLd(): WithContext<Organization> {
  const sameAs = Object.values(siteConfig.links).filter(Boolean) as string[];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function buildArticleJsonLd(data?: JsonLdInput): WithContext<BlogPosting> | null {
  const post = data?.blogPost;
  if (!post) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || siteConfig.ogImage,
    author: { '@type': 'Person', name: siteConfig.creator, url: siteConfig.url },
    publisher: { '@type': 'Person', name: siteConfig.creator },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
    articleSection: post.category,
    keywords: (post.tags || []).join(', '),
    url: `${siteConfig.url}/blog/${post.slug}`,
  };
}

function buildPortfolioJsonLd(data?: JsonLdInput): WithContext<CreativeWork> | null {
  const pf = data?.portfolio;
  if (!pf) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: pf.title,
    description: pf.description,
    image: pf.thumbnail,
    author: { '@type': 'Person', name: siteConfig.creator, url: siteConfig.url },
    creator: { '@type': 'Person', name: siteConfig.creator },
    dateCreated: pf.createdAt,
    url: `${siteConfig.url}/portfolio/${pf.id}`,
    ...(pf.technologies?.length ? { keywords: pf.technologies.join(', ') } : {}),
    ...(pf.liveUrl ? { sameAs: [pf.liveUrl] } : {}),
    ...(pf.githubUrl ? { codeRepository: pf.githubUrl } : {}),
  } as WithContext<CreativeWork>;
}

function buildProfessionalServiceJsonLd(): WithContext<ProfessionalService> {
  // ProfessionalService는 Organization 계열 타입이므로 Organization 속성을 사용
  const sameAs = Object.values(siteConfig.links).filter(Boolean) as string[];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} - Frontend Development`,
    description: '고품질 랜딩 페이지 및 웹 애플리케이션 개발 서비스',
    url: siteConfig.url,
    areaServed: { '@type': 'Country', name: 'South Korea' },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function buildContactPageJsonLd(): WithContext<ContactPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    description: '프로젝트 문의 및 연락처 정보를 확인하세요',
    url: `${siteConfig.url}/contact`,
    mainEntity: { '@type': 'Person', name: siteConfig.creator, url: siteConfig.url },
  };
}

function buildItemListJsonLd(data?: JsonLdInput): WithContext<ItemList> | null {
  const items = data?.items;
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data?.listName || 'Items',
    numberOfItems: data?.totalItems || items.length,
    url: data?.url || siteConfig.url,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': item.url || `${siteConfig.url}/portfolio/${item.id}`,
        name: item.title,
        description: item.description,
        url: item.url || `${siteConfig.url}/portfolio/${item.id}`,
      },
    })),
  };
}

function buildBlogListJsonLd(data?: JsonLdInput): WithContext<Blog> | null {
  const items = data?.items;
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    description: '프론트엔드 개발 경험과 인사이트를 공유하는 블로그',
    url: `${siteConfig.url}/blog`,
    author: { '@type': 'Person', name: siteConfig.creator, url: siteConfig.url },
    blogPost: items.map((i) => ({
      '@type': 'BlogPosting',
      '@id': i.url || `${siteConfig.url}/blog/${i.id}`,
      headline: i.title,
      description: i.description,
      url: i.url || `${siteConfig.url}/blog/${i.id}`,
      author: { '@type': 'Person', name: siteConfig.creator },
    })),
  };
}

export function buildJsonLd(type: JsonLdType, data?: JsonLdInput) {
  switch (type) {
    case 'website':
      return buildWebsiteJsonLd();
    case 'person':
      return buildPersonJsonLd();
    case 'organization':
      return buildOrganizationJsonLd();
    case 'article':
      return buildArticleJsonLd(data);
    case 'portfolio':
      return buildPortfolioJsonLd(data);
    case 'professional-service':
      return buildProfessionalServiceJsonLd();
    case 'contact-page':
      return buildContactPageJsonLd();
    case 'item-list':
      return buildItemListJsonLd(data);
    case 'blog-list':
      return buildBlogListJsonLd(data);
  }
}

// Backward-compatible helper
export function generateJsonLd(type: 'website' | 'article' | 'person', data?: Record<string, unknown>) {
  if (type === 'website') return buildWebsiteJsonLd();
  if (type === 'person') return buildPersonJsonLd();
  if (type === 'article') return buildArticleJsonLd(data as JsonLdInput);
  return { '@context': 'https://schema.org' };
}
