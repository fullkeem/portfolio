import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug, getPageContent } from '@/lib/notion/client';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // 블로그 포스트 메타데이터 가져오기
    const blogPost = await getBlogPostBySlug(slug);

    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // 페이지 내용 가져오기
    const content = await getPageContent(blogPost.id);

    return NextResponse.json({
      ...blogPost,
      content,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 