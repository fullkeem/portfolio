'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';

interface CommentsProps {
  slug: string;
  title: string;
  className?: string;
}

export default function Comments({ slug, title, className = '' }: CommentsProps) {
  const { theme, systemTheme } = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);

  // 현재 테마 결정
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const giscusTheme = currentTheme === 'dark' ? 'dark' : 'light';

  // 환경변수 검증
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const mapping = process.env.NEXT_PUBLIC_GISCUS_MAPPING || 'pathname';

  if (!repo || !repoId || !categoryId) {
    console.warn('Giscus 환경변수가 설정되지 않았습니다.');
    return (
      <div className={`rounded-lg border p-6 text-center ${className}`}>
        <p className="text-muted-foreground">
          댓글 시스템을 로드할 수 없습니다. 환경변수를 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <section ref={commentsRef} className={`${className}`} aria-labelledby="comments-heading">
      <div className="mb-6">
        <h2 id="comments-heading" className="text-2xl font-bold">
          댓글
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          GitHub 계정으로 로그인하여 댓글을 남겨보세요.
        </p>
      </div>

      <div className="rounded-lg border p-1">
        <Giscus
          id="comments"
          repo={repo as `${string}/${string}`}
          repoId={repoId}
          category="General"
          categoryId={categoryId}
          mapping={mapping as 'pathname' | 'url' | 'title' | 'og:title'}
          term={mapping === 'title' ? title : slug}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={giscusTheme}
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
}
