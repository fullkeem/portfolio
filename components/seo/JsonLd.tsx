import { Portfolio, BlogPost } from '@/types';

interface JsonLdProps {
  type: 'website' | 'person' | 'article' | 'portfolio';
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
