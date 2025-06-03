// Notion 관련 타입 정의
import type {
  PageObjectResponse,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";

// Rich Text 타입
export type RichText = RichTextItemResponse[];

// Title 속성 타입
export interface TitleProperty {
  id: string;
  type: "title";
  title: RichText;
}

// Rich Text 속성 타입
export interface RichTextProperty {
  id: string;
  type: "rich_text";
  rich_text: RichText;
}

// URL 속성 타입
export interface URLProperty {
  id: string;
  type: "url";
  url: string | null;
}

// Select 속성 타입
export interface SelectProperty {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

// Multi-Select 속성 타입
export interface MultiSelectProperty {
  id: string;
  type: "multi_select";
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

// Checkbox 속성 타입
export interface CheckboxProperty {
  id: string;
  type: "checkbox";
  checkbox: boolean;
}

// Number 속성 타입
export interface NumberProperty {
  id: string;
  type: "number";
  number: number | null;
}

// Date 속성 타입
export interface DateProperty {
  id: string;
  type: "date";
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

// Files 속성 타입
export interface FilesProperty {
  id: string;
  type: "files";
  files: Array<{
    name: string;
    type: "file" | "external";
    file?: {
      url: string;
      expiry_time: string;
    };
    external?: {
      url: string;
    };
  }>;
}

// Created Time 속성 타입
export interface CreatedTimeProperty {
  id: string;
  type: "created_time";
  created_time: string;
}

// Portfolio 데이터베이스 속성 타입
export interface NotionPortfolioProperties {
  Title: TitleProperty;
  Description: RichTextProperty;
  Thumbnail: FilesProperty;
  Technologies: MultiSelectProperty;
  ProjectType: SelectProperty;
  LiveURL: URLProperty;
  GitHubURL: URLProperty;
  Featured: CheckboxProperty;
  Published: CheckboxProperty;
  Order: NumberProperty;
  Created?: CreatedTimeProperty;
}

// Blog 데이터베이스 속성 타입
export interface NotionBlogProperties {
  Title: TitleProperty;
  Slug: RichTextProperty;
  Excerpt: RichTextProperty;
  Category: SelectProperty;
  Tags: MultiSelectProperty;
  CoverImage: FilesProperty;
  PublishedAt: DateProperty;
  Published: CheckboxProperty;
  Featured: CheckboxProperty;
  ViewCount: NumberProperty;
  ReadingTime: NumberProperty;
}

// 페이지 타입 정의
export type NotionPortfolioPage = Omit<PageObjectResponse, 'properties'> & {
  properties: NotionPortfolioProperties;
};

export type NotionBlogPage = Omit<PageObjectResponse, 'properties'> & {
  properties: NotionBlogProperties;
};

// 헬퍼 함수: RichText에서 plain text 추출
export function getPlainTextFromRichText(richText: RichText): string {
  return richText.map(text => text.plain_text).join('');
}

// 헬퍼 함수: 파일 URL 추출
export function getFileUrl(file: FilesProperty['files'][0]): string {
  if (file.type === 'external' && file.external) {
    return file.external.url;
  } else if (file.type === 'file' && file.file) {
    return file.file.url;
  }
  return '';
}
