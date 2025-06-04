import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/lib/supabase/comments';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id;

    if (!commentId) {
      return NextResponse.json(
        { error: '댓글 ID가 필요합니다' },
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

    const isLiked = await commentService.toggleLike(commentId, request);

    return NextResponse.json({
      success: true,
      isLiked,
      message: isLiked ? '좋아요를 추가했습니다' : '좋아요를 취소했습니다'
    });
  } catch (error) {
    console.error('좋아요 처리 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '좋아요 처리에 실패했습니다' },
      { status: 500 }
    );
  }
} 