import { features } from '@/lib/data';

export function WhyVidyaFrame() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-[var(--muted)]/20 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Why Choose <span className="gradient-text">VidyaFrame</span>?
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Empowering teachers and schools with premium, print-ready classroom materials tailored to your curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 overflow-hidden"
            >
              {/* Highlight Background Glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#0cc87d]/0 via-[#07a3d1]/0 to-[#1d65ff]/0 group-hover:from-[#0cc87d]/5 group-hover:via-[#07a3d1]/5 group-hover:to-[#1d65ff]/10 rounded-2xl transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient || 'from-teal-500 to-cyan-500'} text-white text-2xl mb-6 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl font-semibold text-[var(--foreground)] mb-3"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
