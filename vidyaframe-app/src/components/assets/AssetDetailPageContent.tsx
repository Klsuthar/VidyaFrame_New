'use client';

import { useState, useMemo, useRef } from 'react';
import { Asset } from '@/lib/types';
import { getAssetBySlug, getRelatedAssets, classLevels } from '@/lib/data';
import { AssetCard } from './AssetCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getCategoryGradient, getCategoryIcon } from '@/lib/utils';
import Link from 'next/link';

interface AssetDetailPageContentProps {
  assetSlug: string;
}

export function AssetDetailPageContent({ assetSlug }: AssetDetailPageContentProps) {
  // Find current asset
  const asset = useMemo(() => {
    return getAssetBySlug(assetSlug);
  }, [assetSlug]);

  // If asset is not found
  if (!asset) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
          Asset Not Found
        </h1>
        <p className="text-[var(--muted-foreground)] mb-8">
          The resource you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white font-semibold rounded-xl shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  // Load related assets
  const relatedAssets = useMemo(() => {
    return getRelatedAssets(asset, 4);
  }, [asset]);

  // Category values
  const categorySlug = asset.category.toLowerCase() + 's';
  const categoryGradient = getCategoryGradient(asset.category);
  const categoryIcon = getCategoryIcon(asset.category);

  // Class Label
  const classLabel = useMemo(() => {
    const found = classLevels.find((c) => c.level === asset.classLevel);
    return found ? found.label : `Class ${asset.classLevel}`;
  }, [asset.classLevel]);

  // Live Branding States
  const [schoolName, setSchoolName] = useState('');
  const [themeColor, setThemeColor] = useState('#0cc87d');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [brandingApplied, setBrandingApplied] = useState(false);
  
  // Custom file uploader ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download Options States
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'png'>('pdf');
  const [pageSize, setPageSize] = useState<'a4' | 'a3'>('a4');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handle logo file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setBrandingApplied(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Color Swatches
  const colorSwatches = [
    { name: 'Teal', hex: '#0cc87d' },
    { name: 'Cyan', hex: '#07a3d1' },
    { name: 'Blue', hex: '#1d65ff' },
    { name: 'Purple', hex: '#9333ea' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Orange', hex: '#f97316' },
  ];

  // Perform simulated download
  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);
    
    // Simulate compilation of branded asset
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Auto close success alert after 4s
      setTimeout(() => setDownloadSuccess(false), 4000);

      // Programmatically trigger a dummy file download
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', `${asset.slug}-branded.${downloadFormat}`);
      // In real backend, we'd route to `/api/download?slug=${asset.slug}&school=${schoolName}&color=${themeColor}`
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      {/* Dynamic SEO JSON-LD Structured Data for Google (LearningResource & Offer Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            'name': asset.title,
            'description': asset.description,
            'learningResourceType': asset.category,
            'educationalLevel': classLabel,
            'about': {
              '@type': 'Thing',
              'name': asset.topic,
            },
            'image': `https://vidyaframe.com${asset.imagePreviewUrl}`,
            'publisher': {
              '@type': 'Organization',
              'name': 'VidyaFrame',
              'url': 'https://vidyaframe.com',
            },
            'inLanguage': asset.language || 'English',
            'offers': {
              '@type': 'Offer',
              'price': '0.00',
              'priceCurrency': 'INR',
              'availability': 'https://schema.org/InStock',
            }
          }),
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: `${asset.category}s`, href: `/${categorySlug}` },
          { label: asset.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Interactive Preview Window */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full relative rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-8 shadow-xl overflow-hidden group">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Asset Paper Mockup Container */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl border border-[var(--border)] shadow-2xl flex flex-col justify-between overflow-hidden p-6 transition-all duration-300">
              
              {/* LIVE SCHOOL BRANDING HEADER OVERLAY */}
              <div 
                className="w-full flex items-center justify-between pb-3 mb-4 border-b transition-all duration-300"
                style={{ borderColor: themeColor }}
              >
                <div className="flex items-center gap-3">
                  {/* Logo frame */}
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-base font-bold overflow-hidden shadow-inner shrink-0"
                    style={{ backgroundColor: themeColor }}
                  >
                    {logoPreview ? (
                      <img src={logoPreview} alt="School Logo" className="h-full w-full object-cover" />
                    ) : (
                      <span>🏫</span>
                    )}
                  </div>
                  {/* School details */}
                  <div className="text-left">
                    <h4 
                      className="text-xs sm:text-sm font-bold truncate max-w-[200px]"
                      style={{ color: themeColor, fontFamily: 'var(--font-outfit)' }}
                    >
                      {schoolName || 'YOUR SCHOOL NAME'}
                    </h4>
                    <p className="text-[9px] text-[var(--muted-foreground)] tracking-wider uppercase">
                      Inspiring Excellence
                    </p>
                  </div>
                </div>

                <div 
                  className="px-2 py-0.5 rounded text-[8px] font-semibold text-white uppercase tracking-wider"
                  style={{ backgroundColor: themeColor }}
                >
                  Certified
                </div>
              </div>

              {/* Central Core Content (The actual resource drawing mockup) */}
              <div className={`flex-1 rounded-xl bg-gradient-to-br ${categoryGradient} flex flex-col items-center justify-center p-6 text-white text-center shadow-inner relative group-hover:scale-[1.01] transition-transform duration-500`}>
                <span className="text-7xl mb-4 animate-float">{categoryIcon}</span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 px-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {asset.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
                  {asset.topic}
                </span>

                {/* Subtitle / decorative lines */}
                <div className="w-16 h-1 rounded-full bg-white/40 mt-6" />
                <div className="w-24 h-0.5 rounded-full bg-white/20 mt-2" />
              </div>

              {/* Footer details */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--border)]/40 text-[9px] text-[var(--muted-foreground)]">
                <span>Subject: Mathematics</span>
                <span>Target: {classLabel}</span>
                <span>Powered by VidyaFrame</span>
              </div>
            </div>

            {/* Instruction tooltip overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full pointer-events-none shadow-md">
              Live Interactive Branding Preview
            </div>
          </div>
        </div>

        {/* Right Column: Editing Panel + Actions */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header titles */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold mb-4">
              <span>{categoryIcon}</span>
              <span>{asset.category}</span>
            </span>
            <h1 
              className="text-2xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {asset.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              {asset.description}
            </p>
          </div>

          {/* Interactive School Branding Studio */}
          <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>
              🏫 School Branding Studio
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Personalize this {asset.category.toLowerCase()} with your school details before downloading.
            </p>

            {/* School Name Input */}
            <div className="space-y-2">
              <label htmlFor="schoolName" className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                School Name
              </label>
              <input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => {
                  setSchoolName(e.target.value);
                  setBrandingApplied(true);
                }}
                placeholder="Delhi Public School, Delhi"
                className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-2.5 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
              />
            </div>

            {/* Custom Logo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                School Logo
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--primary)]/50 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                  <svg className="h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-2-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Logo Image
                </button>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove logo
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Brand Color Chooser */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                Primary Brand Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorSwatches.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setThemeColor(color.hex);
                      setBrandingApplied(true);
                    }}
                    className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      themeColor === color.hex ? 'scale-110 shadow-md' : 'scale-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex, borderColor: themeColor === color.hex ? 'var(--foreground)' : 'transparent' }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  >
                    {themeColor === color.hex && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Download & Configuration Block */}
          <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>
              📥 Download Options
            </h2>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                  File Format
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[var(--muted)]/50 p-1 rounded-xl">
                  <button
                    onClick={() => setDownloadFormat('pdf')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      downloadFormat === 'pdf' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => setDownloadFormat('png')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      downloadFormat === 'png' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    PNG Image
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                  Print Size
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[var(--muted)]/50 p-1 rounded-xl">
                  <button
                    onClick={() => setPageSize('a4')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      pageSize === 'a4' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    A4 (Standard)
                  </button>
                  <button
                    onClick={() => setPageSize('a3')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      pageSize === 'a3' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    A3 (Poster)
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Download Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Compiling school branding...</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Print-Ready {downloadFormat.toUpperCase()}</span>
                </>
              )}
            </button>

            {/* Success Alert Banner */}
            {downloadSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl text-sm font-medium animate-fade-in flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold">Download Started!</h4>
                  <p className="text-xs opacity-90">Your customized resource was generated at high-res print resolution.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Assets Section */}
      {relatedAssets.length > 0 && (
        <div className="pt-16 border-t border-[var(--border)]">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>
                Related Resources
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                More high-quality charts & worksheets you might find useful
              </p>
            </div>
            <Link
              href={`/${categorySlug}`}
              className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1.5 shrink-0"
            >
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedAssets.map((item) => (
              <AssetCard key={item.id} asset={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
