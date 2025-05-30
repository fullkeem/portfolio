import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { 
  NotionPortfolioPage, 
  NotionBlogPage,
  NotionPortfolioProperties,
  NotionBlogProperties
} from "./types";
import { getPlainTextFromRichText, getFileUrl } from "./types";

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
          property: "Order",
          direction: "ascending",
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

    // 블록에 하위 블록이 있는 경우 재귀적으로 가져오기
    const blocksWithChildren = await Promise.all(
      blocks.results.map(async (block) => {
        const b = block as any;
        if (b.has_children && !b[b.type]?.children) {
          const children = await getPageContent(b.id);
          b[b.type] = { ...b[b.type], children };
        }
        return b;
      })
    );

    return blocksWithChildren;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return [];
  }
}

// 파싱 함수들
function parsePortfolioPage(page: PageObjectResponse): Portfolio {
  const properties = page.properties as NotionPortfolioProperties;

  return {
    id: page.id,
    title: properties.Title?.title ? getPlainTextFromRichText(properties.Title.title) : "",
    description: properties.Description?.rich_text ? getPlainTextFromRichText(properties.Description.rich_text) : "",
    thumbnail: properties.Thumbnail?.files?.[0] ? getFileUrl(properties.Thumbnail.files[0]) : "",
    technologies: properties.Technologies?.multi_select?.map((tech) => tech.name) || [],
    liveUrl: properties.LiveURL?.url || undefined,
    githubUrl: properties.GitHubURL?.url || undefined,
    createdAt: page.created_time,
    featured: properties.Featured?.checkbox || false,
  };
}

function parseBlogPage(page: PageObjectResponse): BlogPost {
  const properties = page.properties as NotionBlogProperties;

  return {
    id: page.id,
    title: properties.Title?.title ? getPlainTextFromRichText(properties.Title.title) : "",
    slug: properties.Slug?.rich_text ? getPlainTextFromRichText(properties.Slug.rich_text) : "",
    excerpt: properties.Excerpt?.rich_text ? getPlainTextFromRichText(properties.Excerpt.rich_text) : "",
    category: properties.Category?.select?.name || "Uncategorized",
    tags: properties.Tags?.multi_select?.map((tag) => tag.name) || [],
    publishedAt: properties.PublishedAt?.date?.start || page.created_time,
    updatedAt: page.last_edited_time,
    coverImage: properties.CoverImage?.files?.[0] ? getFileUrl(properties.CoverImage.files[0]) : undefined,
  };
}
