import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const categoryLinks = [
  { label: 'Charts', href: '/charts' },
  { label: 'Worksheets', href: '/worksheets' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Posters', href: '/posters' },
];

const classLinks = [
  { label: 'Nursery', href: '/charts?class=Nursery' },
  { label: 'LKG', href: '/charts?class=LKG' },
  { label: 'UKG', href: '/charts?class=UKG' },
  { label: 'Class 1', href: '/charts?class=1' },
  { label: 'Class 2', href: '/charts?class=2' },
  { label: 'Class 3-5', href: '/charts?class=3' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 hidden md:block">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-r from-[#0cc87d]/10 via-[#07a3d1]/10 to-[#1d65ff]/10 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img 
                src="/favicon.svg" 
                alt="VidyaFrame Logo" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>
                <span className="text-[#07a3d1]">Vidya</span>
                <span className="text-[#0cc87d]">Frame</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering teachers with ready-made educational resources. Download beautiful charts, worksheets, certificates & posters with your school branding.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-sm font-medium text-slate-300 mb-2">Stay updated with new resources</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#07a3d1] focus:ring-1 focus:ring-[#07a3d1]/30 transition-all"
                />
                <button className="rounded-xl bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] px-5 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-[#07a3d1] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-[#07a3d1] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Classes</h3>
            <ul className="space-y-2.5">
              {classLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-[#07a3d1] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 VidyaFrame. Made with <span className="text-red-400">❤️</span> for Teachers
          </p>
          <div className="flex items-center gap-4">
            {/* Twitter */}
            <a href="#" className="text-slate-500 hover:text-[#07a3d1] transition-colors" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="text-slate-500 hover:text-red-400 transition-colors" aria-label="YouTube">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:hello@vidyaframe.com" className="text-slate-500 hover:text-[#0cc87d] transition-colors" aria-label="Email">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
