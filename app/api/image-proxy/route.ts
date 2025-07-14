import { NextRequest, NextResponse } from 'next/server';

// 재시도 함수
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      // 일시적인 에러인 경우 재시도
      if (response.status === 503 || response.status === 502 || response.status === 504) {
        if (i < maxRetries) {
          // 지수 백오프: 1초, 2초, 4초 대기
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // 네트워크 에러인 경우 재시도
      if (i < maxRetries && (error as Error).name !== 'TimeoutError') {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

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
    const timeoutMs = isGif ? 20000 : 15000; // GIF: 20초, 일반: 15초 (증가)

    // 이미지 fetch (재시도 로직 포함)
    const response = await fetchWithRetry(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.notion.so/',
        'Accept': isGif ? 'image/gif,image/*,*/*;q=0.8' : 'image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      // 타임아웃 설정
      signal: AbortSignal.timeout(timeoutMs),
    }, 2); // 최대 2번 재시도

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText} for URL: ${imageUrl}`);

      // 403 에러의 경우 더 자세한 로그
      if (response.status === 403) {
        console.error('Access denied - possibly expired Notion URL');
      }

      return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    // Content-Type 검증
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Invalid content type: ${contentType} for URL: ${imageUrl}`);
      return new NextResponse('Invalid content type', { status: 400 });
    }

    // 이미지 데이터 가져오기
    const imageBuffer = await response.arrayBuffer();

    // 이미지 크기 확인 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageBuffer.byteLength > maxSize) {
      console.error(`Image too large: ${imageBuffer.byteLength} bytes for URL: ${imageUrl}`);
      return new NextResponse('Image too large', { status: 413 });
    }

    // 캐싱 헤더 설정 (GIF는 더 긴 캐시)
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', imageBuffer.byteLength.toString());

    // GIF는 더 오래 캐시 (7일), 일반 이미지는 1일
    const cacheMaxAge = isGif ? 604800 : 86400; // 7일 vs 1일
    headers.set('Cache-Control', `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, immutable`);
    headers.set('CDN-Cache-Control', `public, max-age=${cacheMaxAge}`);
    headers.set('Vercel-CDN-Cache-Control', `public, max-age=${cacheMaxAge}`);

    // CORS 헤더
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // ETag 설정 (캐싱 최적화)
    const etag = `"${Buffer.from(imageBuffer).toString('base64').slice(0, 32)}"`;
    headers.set('ETag', etag);

    // If-None-Match 헤더 확인
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    console.error('Failed URL:', imageUrl);

    // 타임아웃 에러 처리
    if (error instanceof Error && error.name === 'TimeoutError') {
      return new NextResponse('Image request timeout', { status: 408 });
    }

    // 네트워크 에러 처리
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('network'))) {
      return new NextResponse('Network error', { status: 502 });
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
      'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
    },
  });
} 