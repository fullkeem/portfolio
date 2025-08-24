'use client';

export function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-2/3 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
      <div className="h-64 w-full rounded bg-muted" />
      <div className="h-4 w-3/4 rounded bg-muted" />
    </div>
  );
}

export default ContentSkeleton;
