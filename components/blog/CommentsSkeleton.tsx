'use client';

export default function CommentsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-1/4 rounded bg-secondary"></div>
      <div className="h-32 rounded bg-secondary"></div>
    </div>
  );
}
