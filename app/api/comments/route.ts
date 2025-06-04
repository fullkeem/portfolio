import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase/client';

// 모든 요청에서 Supabase 설정 확인
function checkSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase가 설정되지 않았습니다' },
      { status: 503 }
    );
  }
  return null;
}

// 댓글 목록 조회
export async function GET(request: NextRequest) {
  const configError = checkSupabaseConfig();
  if (configError) return configError;

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'slug 파라미터가 필요합니다' },
      { status: 400 }
    );
  }

  try {
    // 임시 더미 데이터 (실제로는 Supabase에서 조회)
    const comments: Comment[] = [
      {
        id: '1',
        post_slug: slug,
        author_name: '김개발',
        author_email: 'dev@example.com',
        content: '정말 유용한 포스트네요! 감사합니다.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_approved: true,
        is_deleted: false,
        likes_count: 3,
        system_type: 'custom'
      },
      {
        id: '2',
        post_slug: slug,
        author_name: '이프론트',
        author_email: 'front@example.com',
        content: '코드 예제가 특히 도움이 되었어요. 더 많은 포스트 기대할게요!',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        is_approved: true,
        is_deleted: false,
        likes_count: 5,
        system_type: 'custom'
      }
    ];

    return NextResponse.json({
      success: true,
      comments: comments.filter(c => c.is_approved && !c.is_deleted),
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
  const configError = checkSupabaseConfig();
  if (configError) return configError;

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

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다' },
        { status: 400 }
      );
    }

    // 댓글 길이 검증
    if (content.length < 5 || content.length > 1000) {
      return NextResponse.json(
        { error: '댓글은 5자 이상 1000자 이하로 작성해주세요' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제로는 Supabase에 저장)
    const newComment: Comment = {
      id: Date.now().toString(),
      post_slug,
      author_name: author_name.trim(),
      author_email: author_email.trim(),
      content: content.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_approved: false, // 기본적으로 승인 대기
      is_deleted: false,
      reply_to: reply_to || undefined,
      likes_count: 0,
      system_type: 'custom'
    };

    return NextResponse.json({
      success: true,
      comment: newComment,
      message: '댓글이 성공적으로 작성되었습니다. 검토 후 게시됩니다.'
    });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    return NextResponse.json(
      { error: '댓글 작성에 실패했습니다' },
      { status: 500 }
    );
  }
} 