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

export function FeatureStripSkeleton() {
  return (
    <section
      className="w-full max-w-6xl mx-auto px-6 py-10"
      aria-busy="true"
      aria-label="Laster innhold"
    >
      <div className="mb-6 space-y-3">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="hidden md:grid grid-cols-[2fr_1fr] gap-6">
        <div className="skeleton-frame min-h-[22rem] rounded-2xl p-6">
          <div className="mt-auto space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
        <div className="grid gap-4">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="skeleton-frame min-h-[6.5rem] rounded-2xl p-4"
            >
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="mt-3 h-5 w-4/5" />
            </div>
          ))}
          <div className="skeleton-frame flex min-h-[5.5rem] items-center justify-between rounded-2xl p-4">
            <div className="w-2/3 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="size-5 rounded-full" />
          </div>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        <div className="skeleton-frame flex h-64 flex-col justify-end rounded-2xl p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-6 w-4/5" />
        </div>
        <div className="skeleton-frame flex min-h-[4.75rem] items-center justify-between rounded-2xl p-4">
          <div className="w-2/3 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-full" />
          </div>
          <Skeleton className="size-5 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function PageSkeleton() {
  return (
    <main
      className="w-full max-w-6xl mx-auto px-6 py-8"
      aria-busy="true"
      aria-label="Laster siden"
    >
      <div className="surface-panel p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.45fr_1fr]">
          <div>
            <Skeleton className="h-11 w-full max-w-xl md:h-14" />
            <Skeleton className="mt-3 h-11 w-4/5 max-w-lg md:h-14" />
            <div className="mt-7 space-y-3">
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-4/5 max-w-lg" />
            </div>
            <div className="mt-8 flex gap-3">
              <Skeleton className="h-11 flex-1 rounded-full" />
              <Skeleton className="h-11 flex-1 rounded-full" />
            </div>
          </div>
          <Skeleton className="mx-auto hidden h-40 w-full max-w-sm md:block" />
        </div>
      </div>

      <div className="mt-12 space-y-3">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        <Skeleton className="h-[22rem] w-full rounded-2xl" />
        <div className="grid gap-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
