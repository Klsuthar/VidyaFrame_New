import Link from 'next/link';
import { classLevels } from '@/lib/data';

export function BrowseByClass() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>
            Browse by <span className="gradient-text">Class</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 text-sm sm:text-base">
            Find resources perfectly matched to your students&apos; grade level
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {classLevels.map((cls, i) => (
            <Link
              key={cls.level}
              href={`/charts?class=${cls.level}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`relative rounded-2xl bg-gradient-to-br ${cls.gradient} p-4 sm:p-6 text-center text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20 overflow-hidden`}>
                {/* Decorative circle */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/10 rounded-full" />
                
                <span className="text-2xl sm:text-3xl block mb-1 group-hover:scale-110 transition-transform duration-300">
                  {cls.icon}
                </span>
                <span className="text-xs sm:text-sm font-bold block">{cls.label}</span>
                <span className="text-[10px] sm:text-xs text-white/70 block mt-0.5">
                  {cls.count > 0 ? `${cls.count} items` : 'Coming soon'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
