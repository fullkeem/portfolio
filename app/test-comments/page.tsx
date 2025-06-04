'use client';

import Comments from '@/components/blog/Comments';

export default function TestCommentsPage() {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-4xl font-bold">댓글 시스템 테스트</h1>

      <div className="mb-8 rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">테스트 포스트</h2>
        <p className="text-gray-700">
          이것은 댓글 시스템을 테스트하기 위한 샘플 포스트입니다. 아래에서 댓글을 작성하고 기존
          댓글들을 확인할 수 있습니다.
        </p>
      </div>

      <Comments slug="test-post" title="댓글 시스템 테스트" />
    </div>
  );
}
