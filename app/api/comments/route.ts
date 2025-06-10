import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/lib/supabase/comments';
import { isSupabaseConfigured } from '@/lib/supabase/client';

// 댓글 목록 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'slug 파라미터가 필요합니다' },
      { status: 400 }
    );
  }

  try {
    // Supabase가 설정되지 않은 경우 빈 배열 반환
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        comments: [],
        total: 0,
        message: 'Supabase가 설정되지 않았습니다'
      });
    }

    const comments = await commentService.getComments(slug);

    return NextResponse.json({
      success: true,
      comments,
      total: comments.length
    });
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return NextResponse.json(
      { error: '댓글을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// 댓글 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_slug, author_name, author_email, content, reply_to } = body;

    // 입력값 검증
    if (!post_slug || !author_name || !author_email || !content) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다' },
        { status: 400 }
      );
    }

    // Supabase가 설정되지 않은 경우
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다' },
        { status: 503 }
      );
    }

    const commentId = await commentService.createComment(
      {
        post_slug,
        author_name,
        author_email,
        content,
        reply_to
      },
      request
    );

    return NextResponse.json({
      success: true,
      commentId,
      message: '댓글이 성공적으로 작성되었습니다. 검토 후 게시됩니다.'
    });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '댓글 작성에 실패했습니다' },
      { status: 500 }
    );
  }
} 