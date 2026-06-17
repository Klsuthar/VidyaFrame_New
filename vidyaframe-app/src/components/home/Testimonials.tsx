import { testimonials } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#07a3d1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1d65ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Loved by <span className="gradient-text">Educators</span> Across India
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Here is what teachers and school administrators say about using VidyaFrame in their classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={t.id}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[var(--foreground)] text-sm italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--border)]/60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white text-xs font-bold uppercase shadow-sm">
                    {initials}
                  </div>
                  <div>
                    <h4 
                      className="text-sm font-semibold text-[var(--foreground)] leading-none mb-1"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {t.name}
                    </h4>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t.role}, {t.school}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
