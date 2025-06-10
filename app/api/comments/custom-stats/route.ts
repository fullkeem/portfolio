import { NextRequest, NextResponse } from 'next/server';

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
    // 임시 통계 데이터 (실제로는 Supabase에서 조회)
    const stats = {
      count: 2, // 해당 포스트의 커스텀 댓글 수
      last_activity: new Date().toISOString()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('댓글 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '통계를 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
} 