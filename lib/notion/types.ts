// Notion 관련 타입 정의
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface NotionPortfolioProperties {
  Title: any;
  Description: any;
  Thumbnail: any;
  Technologies: any;
  ProjectType: any;
  LiveURL: any;
  GitHubURL: any;
  Featured: any;
  Published: any;
  Order: any;
  Created: any;
}

export interface NotionBlogProperties {
  Title: any;
  Slug: any;
  Excerpt: any;
  Category: any;
  Tags: any;
  CoverImage: any;
  PublishedAt: any;
  Published: any;
  Featured: any;
  ViewCount: any;
  ReadingTime: any;
}

export type NotionPortfolioPage = Omit<PageObjectResponse, 'properties'> & {
  properties: NotionPortfolioProperties;
};

export type NotionBlogPage = Omit<PageObjectResponse, 'properties'> & {
  properties: NotionBlogProperties;
};
