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
    // Giscus는 GitHub Discussions API를 통해 댓글 수를 가져올 수 있지만
    // 여기서는 임시로 0을 반환 (실제 구현시 GitHub API 연동 필요)
    const stats = {
      count: 0, // GitHub Discussions에서 가져올 댓글 수
      last_activity: null
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Giscus 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '통계를 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
} 