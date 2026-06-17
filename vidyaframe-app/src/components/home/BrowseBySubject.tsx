import Link from 'next/link';
import { categories } from '@/lib/data';

export function BrowseBySubject() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 text-sm sm:text-base">
            Explore our vast library of educational resources
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="glass-card p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--primary)]/10 gradient-border h-full">
                {/* Icon */}
                <div className={`inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                </div>
                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--card-foreground)] mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {cat.name}s
                </h3>
                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">
                  {cat.description}
                </p>
                {/* Count */}
                <span className="text-xs font-semibold text-[var(--primary)]">
                  {cat.count} resources →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
