import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('skeleton rounded-xl', className)}
      {...props}
    />
  );
}

function LoadingStatus({ label = 'Laster innhold' }: { label?: string }) {
  return (
    <div className="loading-status" role="status" aria-live="polite">
      <span>{label}</span>
      <span className="loading-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

export function FeatureStripSkeleton() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10" aria-busy="true">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-56" />
        </div>
        <LoadingStatus />
      </div>

      <div className="hidden md:grid grid-cols-[2fr_1fr] gap-6">
        <div className="skeleton-frame min-h-[22rem] rounded-2xl p-6">
          <Skeleton className="mt-auto h-7 w-2/3" />
          <Skeleton className="mt-3 h-4 w-2/5" />
        </div>
        <div className="grid gap-4">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="skeleton-frame min-h-[6.5rem] rounded-2xl p-4"
            >
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="mt-3 h-3 w-1/2" />
            </div>
          ))}
          <div className="skeleton-frame min-h-[8.5rem] rounded-xl p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-3 h-4 w-5/6" />
            <Skeleton className="mt-3 h-4 w-1/2" />
          </div>
        </div>
      </div>

      <div className="skeleton-frame flex h-64 flex-col justify-end rounded-2xl p-5 md:hidden">
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="mt-3 h-4 w-1/2" />
      </div>
    </section>
  );
}

export function PageSkeleton() {
  return (
    <main className="w-full max-w-6xl mx-auto px-6 py-8" aria-busy="true">
      <div className="surface-panel p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-52" />
          <LoadingStatus label="Laster siden" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="surface-card p-4 space-y-4"
              aria-hidden="true"
            >
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-7 w-4/5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
