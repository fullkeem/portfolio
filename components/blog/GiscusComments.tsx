'use client';

import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  config: {
    repo: string | undefined;
    repoId: string | undefined;
    categoryId: string | undefined;
    mapping: string;
  };
  theme: string | undefined;
  slug: string;
  title: string;
}

export default function GiscusComments({ config, theme, slug, title }: GiscusCommentsProps) {
  const giscusTheme = theme === 'dark' ? 'dark' : 'light';

  if (!config.repo || !config.repoId || !config.categoryId) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">GitHub 댓글 시스템 설정이 완료되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-1">
      <Giscus
        id="giscus-comments"
        repo={config.repo as `${string}/${string}`}
        repoId={config.repoId}
        category="General"
        categoryId={config.categoryId}
        mapping={config.mapping as 'pathname' | 'url' | 'title' | 'og:title'}
        term={config.mapping === 'title' ? title : slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
