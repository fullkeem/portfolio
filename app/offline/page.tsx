// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">오프라인 상태입니다</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        인터넷 연결을 확인하고 다시 시도해주세요.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:opacity-90"
      >
        다시 시도
      </button>
    </div>
  );
}
