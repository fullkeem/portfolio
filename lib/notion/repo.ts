import { unstable_cache as cache } from 'next/cache';
import { getPortfolios, getBlogPosts } from '@/lib/notion/client';

export const getTopPortfolios = cache(async (limit = 3) => {
  const items = await getPortfolios();
  return items.slice(0, limit);
}, ['portfolios:top'], { revalidate: 60, tags: ['portfolios'] });

export const getTopPosts = cache(async (limit = 3) => {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}, ['blog:top'], { revalidate: 60, tags: ['blog'] });


