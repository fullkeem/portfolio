import 'server-only';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { unstable_cache as cache } from 'next/cache';

if (!process.env.NOTION_TOKEN) {
  throw new Error('Missing NOTION_TOKEN environment variable');
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * 페이지를 Markdown 문자열로 변환
 */
async function generatePageMarkdown(pageId: string): Promise<string> {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const md = n2m.toMarkdownString(mdBlocks) as unknown as string | { parent?: string };
  if (typeof md === 'string') return md;
  return md.parent || '';
}

export async function getPageMarkdown(pageId: string): Promise<string> {
  return cache(
    () => generatePageMarkdown(pageId),
    ['notion:md', pageId],
    { revalidate: 3600, tags: [`notion:md:${pageId}`] }
  )();
}

/**
 * 블로그 슬러그로 Markdown 가져오기 (존재 시)
 */
export async function getBlogMarkdownBySlug(slug: string): Promise<string | null> {
  return cache(
    async () => {
      const { getBlogPostBySlug } = await import('./client');
      const post = await getBlogPostBySlug(slug);
      if (!post) return null;
      return generatePageMarkdown(post.id);
    },
    ['notion:md:blog', slug],
    { revalidate: 3600, tags: [`notion:md:blog:${slug}`] }
  )();
}


