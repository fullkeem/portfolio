import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // URL 유효성 검증
    const parsedUrl = new URL(url);
    const allowedHosts = [
      'www.notion.so',
      'images.unsplash.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
    ];

    const isAllowed = allowedHosts.some(host =>
      parsedUrl.hostname === host ||
      parsedUrl.hostname.endsWith('.amazonaws.com')
    );

    if (!isAllowed) {
      return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
    }

    // 타임아웃이 있는 fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS Image Proxy)',
        'Accept': 'image/*',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) {
      throw new Error('Response is not an image');
    }

    const buffer = await response.arrayBuffer();

    // 캐시 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800'); // 1일 캐시, CDN은 1주일
    headers.set('Content-Length', buffer.byteLength.toString());

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Image proxy error:', error);

    // 타임아웃 에러 처리
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Image fetch timeout' }, { status: 408 });
    }

    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
} 