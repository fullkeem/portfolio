import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  try {
    // Notion 이미지 URL 유효성 검사
    const isValidNotionUrl =
      imageUrl.includes('notion.so') ||
      imageUrl.includes('s3.us-west-2.amazonaws.com') ||
      imageUrl.includes('prod-files-secure.s3.us-west-2.amazonaws.com');

    if (!isValidNotionUrl) {
      return new NextResponse('Invalid image URL', { status: 400 });
    }

    // 이미지 fetch
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.notion.so/',
      },
      // 타임아웃 설정
      signal: AbortSignal.timeout(10000), // 10초
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    // Content-Type 검증
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }

    // 이미지 데이터 가져오기
    const imageBuffer = await response.arrayBuffer();

    // 캐싱 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // 24시간 캐시
    headers.set('CDN-Cache-Control', 'public, max-age=86400');
    headers.set('Vercel-CDN-Cache-Control', 'public, max-age=86400');

    // CORS 헤더
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Image proxy error:', error);

    // 타임아웃 에러 처리
    if (error instanceof Error && error.name === 'TimeoutError') {
      return new NextResponse('Image request timeout', { status: 408 });
    }

    return new NextResponse('Internal server error', { status: 500 });
  }
}

// OPTIONS 메서드 처리 (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 