import { Portfolio, BlogPost } from '@/types';

interface JsonLdProps {
  type:
    | 'website'
    | 'person'
    | 'article'
    | 'portfolio'
    | 'organization'
    | 'professional-service'
    | 'contact-page'
    | 'item-list'
    | 'blog-list';
  data?: {
    name?: string;
    description?: string;
    url?: string;
    image?: string;
    author?: {
      name: string;
      url: string;
    };
    datePublished?: string;
    dateModified?: string;
    portfolio?: Portfolio;
    blogPost?: BlogPost;
    listName?: string;
    items?: Array<{
      id: string;
      title: string;
      description?: string;
      url?: string;
    }>;
    totalItems?: number;
  };
}

export function JsonLd({ type, data }: JsonLdProps) {
  const generateSchema = () => {
    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://fullkeem.com' : 'http://localhost:3000';

    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'fullkeem - Frontend Developer Portfolio',
          description:
            '프론트엔드 개발자 fullkeem의 포트폴리오입니다. React, Next.js, TypeScript를 활용한 다양한 프로젝트를 확인해보세요.',
          url: baseUrl,
          author: {
            '@type': 'Person',
            name: 'fullkeem',
            url: baseUrl,
            jobTitle: 'Frontend Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'fullkeem',
            },
          },
          publisher: {
            '@type': 'Person',
            name: 'fullkeem',
          },
        };

      case 'person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'fullkeem',
          jobTitle: 'Frontend Developer',
          description:
            '사용자 경험을 중시하며 최신 기술을 활용하여 효율적인 웹 애플리케이션을 개발하는 프론트엔드 개발자입니다.',
          url: baseUrl,
          image: `${baseUrl}/images/profile.jpg`,
          sameAs: ['https://github.com/fullkeem', 'https://linkedin.com/in/fullkeem'],
          knowsAbout: [
            'React',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'HTML',
            'CSS',
            'Tailwind CSS',
            'Node.js',
            'Frontend Development',
            'Web Development',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'fullkeem',
          },
        };

      case 'article':
        if (!data?.blogPost) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.blogPost.title,
          description: data.blogPost.excerpt,
          image: data.blogPost.coverImage || `${baseUrl}/images/blog-default.jpg`,
          author: {
            '@type': 'Person',
            name: 'fullkeem',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'fullkeem',
          },
          datePublished: data.blogPost.publishedAt,
          dateModified: data.blogPost.updatedAt || data.blogPost.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${data.blogPost.slug}`,
          },
          articleSection: data.blogPost.category,
          keywords: data.blogPost.tags.join(', '),
          wordCount: Math.floor(data.blogPost.excerpt.length / 4), // 추정 단어 수
          url: `${baseUrl}/blog/${data.blogPost.slug}`,
        };

      case 'portfolio':
        if (!data?.portfolio) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: data.portfolio.title,
          description: data.portfolio.description,
          image: data.portfolio.thumbnail,
          author: {
            '@type': 'Person',
            name: 'fullkeem',
            url: baseUrl,
          },
          creator: {
            '@type': 'Person',
            name: 'fullkeem',
          },
          dateCreated: data.portfolio.createdAt,
          url: `${baseUrl}/portfolio/${data.portfolio.id}`,
          genre: 'Web Development',
          keywords: data.portfolio.technologies.join(', '),
          ...(data.portfolio.liveUrl && {
            sameAs: [data.portfolio.liveUrl],
          }),
          ...(data.portfolio.githubUrl && {
            codeRepository: data.portfolio.githubUrl,
          }),
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'fullkeem',
          alternateName: '김충만',
          description:
            '랜딩 페이지 제작 전문 프론트엔드 개발자. 모던 웹 기술로 비즈니스 성장을 도와드립니다.',
          url: baseUrl,
          logo: `${baseUrl}/images/logo.png`,
          image: `${baseUrl}/images/profile.jpg`,
          founder: {
            '@type': 'Person',
            name: 'fullkeem',
            jobTitle: 'Frontend Developer',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['Korean', 'English'],
          },
          areaServed: {
            '@type': 'Country',
            name: 'South Korea',
          },
          knowsAbout: [
            'Frontend Development',
            'React',
            'Next.js',
            'TypeScript',
            'Landing Page Development',
            'Web Performance Optimization',
          ],
          sameAs: ['https://github.com/fullkeem', 'https://linkedin.com/in/fullkeem'],
        };

      case 'professional-service':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Frontend Development Services',
          description: '고품질 랜딩 페이지 및 웹 애플리케이션 개발 서비스',
          provider: {
            '@type': 'Person',
            name: 'fullkeem',
            jobTitle: 'Frontend Developer',
            url: baseUrl,
          },
          serviceType: 'Web Development',
          category: 'Technology',
          areaServed: {
            '@type': 'Country',
            name: 'South Korea',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Development Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '랜딩 페이지 제작',
                  description: '반응형 랜딩 페이지 개발',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '웹 애플리케이션 개발',
                  description: 'React/Next.js 기반 웹 앱 개발',
                },
              },
            ],
          },
        };

      case 'contact-page':
        return {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact fullkeem',
          description: '프로젝트 문의 및 연락처 정보를 확인하세요',
          url: `${baseUrl}/contact`,
          mainEntity: {
            '@type': 'Person',
            name: 'fullkeem',
            jobTitle: 'Frontend Developer',
            url: baseUrl,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: ['Korean', 'English'],
            },
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Contact',
                item: `${baseUrl}/contact`,
              },
            ],
          },
        };

      case 'item-list':
        if (!data?.items) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: data.listName || 'Portfolio Items',
          description: `${data.listName || 'Items'} 목록`,
          numberOfItems: data.totalItems || data.items.length,
          url: data.url || baseUrl,
          itemListElement: data.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              '@id': item.url || `${baseUrl}/portfolio/${item.id}`,
              name: item.title,
              description: item.description,
              url: item.url || `${baseUrl}/portfolio/${item.id}`,
            },
          })),
        };

      case 'blog-list':
        if (!data?.items) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'fullkeem Blog',
          description: '프론트엔드 개발 경험과 인사이트를 공유하는 블로그',
          url: `${baseUrl}/blog`,
          author: {
            '@type': 'Person',
            name: 'fullkeem',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'fullkeem',
          },
          blogPost: data.items.map((item) => ({
            '@type': 'BlogPosting',
            '@id': item.url || `${baseUrl}/blog/${item.id}`,
            headline: item.title,
            description: item.description,
            url: item.url || `${baseUrl}/blog/${item.id}`,
            author: {
              '@type': 'Person',
              name: 'fullkeem',
            },
          })),
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
