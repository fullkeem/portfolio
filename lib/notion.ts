import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

if (!process.env.NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN environment variable");
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
}

// Portfolio 관련 함수들
export async function getPortfolios(): Promise<Portfolio[]> {
  if (!process.env.NOTION_DATABASE_ID) {
    console.warn("Missing NOTION_DATABASE_ID");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Featured",
          direction: "descending",
        },
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => parsePortfolioPage(page as PageObjectResponse));
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }
}

export async function getPortfolioById(id: string): Promise<Portfolio | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse;
    return parsePortfolioPage(page);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Blog 관련 함수들
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_BLOG_DATABASE_ID) {
    console.warn("Missing NOTION_BLOG_DATABASE_ID");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "PublishedAt",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => parseBlogPage(page as PageObjectResponse));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!process.env.NOTION_BLOG_DATABASE_ID) {
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    return parseBlogPage(response.results[0] as PageObjectResponse);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// 페이지 내용 가져오기
export async function getPageContent(pageId: string) {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    return blocks.results;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return [];
  }
}

// 파싱 함수들
function parsePortfolioPage(page: PageObjectResponse): Portfolio {
  const properties = page.properties as any;

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "",
    description: properties.Description?.rich_text?.[0]?.plain_text || "",
    thumbnail: properties.Thumbnail?.files?.[0]?.file?.url || properties.Thumbnail?.files?.[0]?.external?.url || "",
    technologies: properties.Technologies?.multi_select?.map((tech: any) => tech.name) || [],
    liveUrl: properties.LiveURL?.url || undefined,
    githubUrl: properties.GitHubURL?.url || undefined,
    createdAt: properties.Created?.created_time || page.created_time,
    featured: properties.Featured?.checkbox || false,
  };
}

function parseBlogPage(page: PageObjectResponse): BlogPost {
  const properties = page.properties as any;

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "",
    slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
    excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
    category: properties.Category?.select?.name || "Uncategorized",
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    publishedAt: properties.PublishedAt?.date?.start || page.created_time,
    updatedAt: page.last_edited_time,
    coverImage: properties.CoverImage?.files?.[0]?.file?.url || properties.CoverImage?.files?.[0]?.external?.url || undefined,
  };
}
