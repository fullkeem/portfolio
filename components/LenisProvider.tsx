'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ReactLenis를 동적 로드 (스크롤 시작 후 로드)
const ReactLenis = dynamic(() => import('lenis/react').then((mod) => mod.ReactLenis), {
  ssr: false, // Lenis는 브라우저에서만 작동
  loading: () => null, // 로딩 중에는 아무것도 표시하지 않음
});

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [shouldLoadLenis, setShouldLoadLenis] = useState(false);

  useEffect(() => {
    // 사용자가 스크롤을 시작하면 Lenis를 로드
    const handleScroll = () => {
      if (!shouldLoadLenis) {
        setShouldLoadLenis(true);
        // 스크롤 이벤트 리스너 제거 (한 번만 실행)
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleScroll);
      }
    };

    // 다양한 스크롤 이벤트 감지
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleScroll, { passive: true });

    // 3초 후 자동 로드 (사용자가 스크롤하지 않는 경우)
    const timeout = setTimeout(() => {
      setShouldLoadLenis(true);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleScroll);
      clearTimeout(timeout);
    };
  }, [shouldLoadLenis]);

  // Lenis가 로드되지 않았으면 일반 div로 감싸기
  if (!shouldLoadLenis) {
    return <div>{children}</div>;
  }

  // Lenis가 로드되면 ReactLenis로 감싸기
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
