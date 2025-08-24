import { Skeleton } from '@/components/common/loading/Skeleton';

export function PortfolioPageSkeleton() {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* 헤더 스켈레톤 */}
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-64" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        {/* 1열: 모바일 */}
        <div className="masonry-grid block md:hidden" role="status" aria-label="포트폴리오 로딩 중">
          <div className="masonry-grid-column">
            {Array.from({ length: 6 }).map((_, i) => {
              const heights = [350, 280, 200, 420, 320, 280, 180];
              const height = heights[i % heights.length];
              return (
                <div key={`m1-${i}`} className="image-card">
                  <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 bg-muted/40">
                    <div
                      className="w-full animate-pulse bg-gradient-to-br from-muted to-muted/60"
                      style={{ height: `${height}px` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2열: 태블릿 */}
        <div
          className="masonry-grid hidden gap-4 md:flex lg:hidden"
          role="status"
          aria-label="포트폴리오 로딩 중"
        >
          <div className="masonry-grid-column w-1/2 space-y-6 px-2">
            {Array.from({ length: 6 }).map((_, i) => {
              const heights = [350, 280, 200, 420, 320, 280, 180];
              const height = heights[(i * 2 + 0) % heights.length];
              return (
                <div key={`t1-${i}`} className="image-card">
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-muted/40">
                    <div
                      className="w-full animate-pulse bg-gradient-to-br from-muted to-muted/60"
                      style={{ height: `${height}px` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="masonry-grid-column w-1/2 space-y-6 px-2">
            {Array.from({ length: 6 }).map((_, i) => {
              const heights = [350, 280, 200, 420, 320, 280, 180];
              const height = heights[(i * 2 + 1) % heights.length];
              return (
                <div key={`t2-${i}`} className="image-card">
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-muted/40">
                    <div
                      className="w-full animate-pulse bg-gradient-to-br from-muted to-muted/60"
                      style={{ height: `${height}px` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3열: 데스크톱 */}
        <div
          className="masonry-grid hidden gap-6 lg:flex"
          role="status"
          aria-label="포트폴리오 로딩 중"
        >
          {[0, 1, 2].map((col) => (
            <div key={`d-col-${col}`} className="masonry-grid-column w-1/3 space-y-6 px-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const heights = [350, 280, 200, 420, 320, 280, 180];
                const height = heights[(i * 3 + col) % heights.length];
                return (
                  <div key={`d${col}-${i}`} className="image-card">
                    <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-muted/40">
                      <div
                        className="w-full animate-pulse bg-gradient-to-br from-muted to-muted/60"
                        style={{ height: `${height}px` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 하단 카운트 텍스트 스켈레톤 */}
        <div className="mt-12 text-center">
          <Skeleton className="mx-auto h-4 w-40" />
        </div>
      </div>
    </div>
  );
}

export default PortfolioPageSkeleton;
