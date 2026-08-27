import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <div>
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>404</h1>
        <h2>이 페이지는 자리를 옮겼거나 존재하지 않습니다.</h2>
        <Link href="/" className="button button--blue">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}
