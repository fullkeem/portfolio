'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="not-found">
      <div>
        <p className="eyebrow">SYSTEM ERROR</p>
        <h1>500</h1>
        <h2>잠시 문제가 생겼습니다.</h2>
        <p>다시 시도하거나 처음 화면으로 돌아가 주세요.</p>
        <div className="case-links">
          <button type="button" className="button button--blue" onClick={reset}>다시 시도</button>
          <Link href="/" className="button button--paper">홈으로</Link>
        </div>
      </div>
    </div>
  );
}
