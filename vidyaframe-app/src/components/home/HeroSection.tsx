'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { stats } from '@/lib/data';

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const targets = [10000, 5000, 500, 25000];
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;

          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCounters(targets.map((t) => Math.floor(t * eased)));
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categoryPills = [
    { label: '📊 Charts', href: '/charts' },
    { label: '📝 Worksheets', href: '/worksheets' },
    { label: '🏆 Certificates', href: '/certificates' },
    { label: '🖼️ Posters', href: '/posters' },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0cc87d]/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#07a3d1]/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#1d65ff]/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--muted-foreground)] mb-6 animate-fade-in shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#0cc87d] animate-pulse" />
          10,000+ Resources for Indian Schools
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Find Educational{' '}
          <span className="gradient-text">Charts</span>,{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">Worksheets</span> &{' '}
          <br className="hidden lg:block" />
          School Resources{' '}
          <span className="text-[var(--primary)]">in Seconds</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Download ready-made classroom resources with your school branding.
          <br className="hidden sm:block" />
          Aligned with NCERT/CBSE curriculum for Nursery to Class 5.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
            <div className="relative flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl shadow-black/5 dark:shadow-black/20">
              <svg className="ml-4 h-5 w-5 text-[var(--muted-foreground)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search charts, worksheets, certificates..."
                className="flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-[var(--muted-foreground)]"
              />
              <button
                onClick={handleSearch}
                className="rounded-xl bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          {categoryPills.map((pill) => (
            <a
              key={pill.href}
              href={pill.href}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              {pill.label}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-4 sm:p-6 text-center animate-fade-in"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-outfit)' }}>
                {counters[i].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
