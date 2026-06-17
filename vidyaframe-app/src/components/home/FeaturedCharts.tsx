import Link from 'next/link';
import { getFeaturedAssets } from '@/lib/data';
import { AssetCard } from '@/components/assets/AssetCard';

export function FeaturedCharts() {
  const featured = getFeaturedAssets(8);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold section-heading" style={{ fontFamily: 'var(--font-outfit)' }}>
              Featured Charts
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 text-sm sm:text-base">
              Most popular educational charts loved by teachers
            </p>
          </div>
          <Link
            href="/charts"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:gap-3 transition-all duration-300"
          >
            View All Charts
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((asset, i) => (
            <div key={asset.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/charts"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all"
          >
            View All Charts →
          </Link>
        </div>
      </div>
    </section>
  );
}
