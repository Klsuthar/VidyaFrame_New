// ============================================
// VidyaFrame — Loading Skeleton Components
// Shimmer animations matching real component shapes
// ============================================

interface AssetCardSkeletonProps {
  variant?: 'default' | 'compact';
}

function ShimmerBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`shimmer-block rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function AssetCardSkeleton({ variant = 'default' }: AssetCardSkeletonProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 ${
        isCompact ? 'max-w-[180px]' : ''
      }`}
      role="status"
      aria-label="Loading asset"
    >
      {/* Shimmer style injection — rendered once, deduplicated by React */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer-block {
          background: linear-gradient(
            90deg,
            rgba(0,0,0,0.06) 25%,
            rgba(0,0,0,0.12) 37%,
            rgba(0,0,0,0.06) 63%
          );
          background-size: 800px 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        :is([data-theme="dark"], .dark) .shimmer-block {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.06) 25%,
            rgba(255,255,255,0.12) 37%,
            rgba(255,255,255,0.06) 63%
          );
          background-size: 800px 100%;
        }
      `}</style>

      {/* Image area */}
      <ShimmerBlock className={`w-full ${isCompact ? 'aspect-square' : 'aspect-[3/4]'} rounded-none`} />

      {/* Content */}
      <div className={`${isCompact ? 'p-3' : 'p-4'} space-y-3`}>
        {/* Title */}
        <ShimmerBlock className="h-4 w-full rounded-md" />
        {!isCompact && <ShimmerBlock className="h-4 w-3/4 rounded-md" />}

        {/* Badges row */}
        <div className="flex items-center justify-between pt-1">
          <ShimmerBlock className="h-6 w-16 rounded-full" />
          <ShimmerBlock className="h-4 w-12 rounded" />
        </div>
      </div>
    </div>
  );
}

interface AssetGridSkeletonProps {
  count?: number;
  variant?: 'default' | 'compact';
}

export function AssetGridSkeleton({ count = 10, variant = 'default' }: AssetGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      role="status"
      aria-label="Loading assets"
    >
      {Array.from({ length: count }).map((_, i) => (
        <AssetCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
