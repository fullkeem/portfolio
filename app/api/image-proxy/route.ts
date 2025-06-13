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

    // GIF 파일 감지
    const isGif = imageUrl.toLowerCase().includes('.gif');

    // GIF의 경우 더 긴 타임아웃과 특별한 헤더 사용
    const timeoutMs = isGif ? 15000 : 10000; // GIF: 15초, 일반: 10초

    // 이미지 fetch
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.notion.so/',
        'Accept': isGif ? 'image/gif,image/*,*/*;q=0.8' : 'image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      },
      // 타임아웃 설정
      signal: AbortSignal.timeout(timeoutMs),
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

    // 캐싱 헤더 설정 (GIF는 더 긴 캐시)
    const headers = new Headers();
    headers.set('Content-Type', contentType);

    // GIF는 더 오래 캐시 (7일), 일반 이미지는 1일
    const cacheMaxAge = isGif ? 604800 : 86400; // 7일 vs 1일
    headers.set('Cache-Control', `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}`);
    headers.set('CDN-Cache-Control', `public, max-age=${cacheMaxAge}`);
    headers.set('Vercel-CDN-Cache-Control', `public, max-age=${cacheMaxAge}`);

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