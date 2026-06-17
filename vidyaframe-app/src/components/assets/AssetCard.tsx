import Link from 'next/link';
import { Asset } from '@/lib/types';
import { getCategoryGradient, getClassLabel, formatNumber, getCategoryIcon } from '@/lib/utils';

interface AssetCardProps {
  asset: Asset;
  variant?: 'default' | 'compact';
}

export function AssetCard({ asset, variant = 'default' }: AssetCardProps) {
  const categorySlug = asset.category.toLowerCase();
  const href = `/${categorySlug}/${asset.slug}`;
  const gradient = getCategoryGradient(asset.category);
  const icon = getCategoryIcon(asset.category);

  if (variant === 'compact') {
    return (
      <Link href={href} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          {/* Thumbnail */}
          <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden p-2`}>
            {asset.imagePreviewUrl ? (
              <img
                src={asset.imagePreviewUrl}
                alt={asset.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <span className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300">{icon}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          {/* Info */}
          <div className="p-3">
            <h3 className="text-sm font-semibold line-clamp-2 text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors">
              {asset.title}
            </h3>
            <span className="text-xs text-[var(--muted-foreground)] mt-1 block">{getClassLabel(asset.classLevel)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--primary)]/5 gradient-border">
        {/* Thumbnail */}
        <div className={`aspect-[3/4] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden p-3`}>
          {asset.imagePreviewUrl ? (
            <img
              src={asset.imagePreviewUrl}
              alt={asset.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="text-center">
              <span className="text-5xl block mb-2 group-hover:scale-110 transition-transform duration-500">{icon}</span>
              <span className="text-white/80 text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                {asset.category}
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          {/* Class badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-[var(--foreground)] shadow-sm backdrop-blur-sm">
              {getClassLabel(asset.classLevel)}
            </span>
          </div>
          {/* Priority indicator */}
          {asset.priority === 'High' && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/90 text-amber-950 font-medium">
                ⭐ Popular
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 mb-3 text-sm leading-snug">
            {asset.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{formatNumber(asset.downloads)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatNumber(asset.views)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
