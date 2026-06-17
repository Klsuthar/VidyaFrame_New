'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Asset, Category } from '@/lib/types';
import { categories, classLevels, getAssetsByCategory, getTopics } from '@/lib/data';
import { AssetCard } from './AssetCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface CategoryPageContentProps {
  categorySlug: string;
}

export function CategoryPageContent({ categorySlug }: CategoryPageContentProps) {
  const searchParams = useSearchParams();
  const classParam = searchParams.get('class');

  // Find current category
  const category = useMemo(() => {
    return categories.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  // If category is not found, default to first or generic details
  const catName = category?.name || 'Resource';
  const catGradient = category?.gradient || 'from-teal-500 to-cyan-500';
  const catIcon = category?.icon || '📊';

  // Load all assets for this category
  const allAssets = useMemo(() => {
    return getAssetsByCategory(categorySlug);
  }, [categorySlug]);

  // Topics available in this category
  const topics = useMemo(() => {
    return getTopics(categorySlug);
  }, [categorySlug]);

  // States
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'downloads' | 'newest'>('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Set class level if passed via URL query param
  useEffect(() => {
    if (classParam) {
      setSelectedClass(classParam);
    }
  }, [classParam]);

  // Filtered and sorted assets
  const filteredAssets = useMemo(() => {
    let result = [...allAssets];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Class filter
    if (selectedClass) {
      result = result.filter((a) => a.classLevel.toLowerCase() === selectedClass.toLowerCase());
    }

    // Topic filter
    if (selectedTopic) {
      result = result.filter((a) => a.topic.toLowerCase() === selectedTopic.toLowerCase());
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'downloads') {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [allAssets, searchQuery, selectedClass, selectedTopic, sortBy]);

  // Active filter count
  const activeFilterCount = (selectedClass ? 1 : 0) + (selectedTopic ? 1 : 0);

  const resetFilters = () => {
    setSelectedClass(null);
    setSelectedTopic(null);
    setSearchQuery('');
  };

  const hasMore = filteredAssets.length > visibleCount;
  const paginatedAssets = filteredAssets.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: `${catName}s`, href: `/${categorySlug}` }]} />

      {/* Category Hero Banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${catGradient} p-8 sm:p-12 text-white mb-12 shadow-xl shadow-cyan-500/5`}>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-3xl mb-6 shadow-inner">
            {catIcon}
          </div>
          <h1 
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Educational {catName}s
          </h1>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl">
            {category?.description || `Explore our high-quality printable ${categorySlug} for primary classes. Apply your school logo and colors with one click before downloading.`}
          </p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 sticky top-24 border border-[var(--border)] bg-[var(--card)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <h2 className="font-bold text-lg text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>Filters</h2>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[var(--primary)] hover:underline font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter by Class */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Class Level</h3>
            <div className="space-y-2">
              {classLevels.map((cls) => (
                <button
                  key={cls.slug}
                  onClick={() => setSelectedClass(selectedClass === cls.level ? null : cls.level)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    selectedClass === cls.level
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold border border-[var(--primary)]/20'
                      : 'hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cls.icon}</span>
                    <span>{cls.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Topic */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Maths Topics</h3>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-all flex items-center justify-between ${
                    selectedTopic === topic
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold border border-[var(--primary)]/20'
                      : 'hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-transparent'
                  }`}
                >
                  <span>{topic}</span>
                  {selectedTopic === topic && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Assets Listing Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
            {/* Search within category */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${categorySlug}...`}
                className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-2 pl-10 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-sm rounded-xl transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="h-5 w-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--muted-foreground)] hidden md:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 outline-none focus:border-[var(--primary)] transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--muted-foreground)]">Active filters:</span>
              {selectedClass && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium border border-[var(--primary)]/20">
                  Class: {selectedClass}
                  <button onClick={() => setSelectedClass(null)} className="hover:text-[var(--foreground)]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {selectedTopic && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium border border-[var(--primary)]/20">
                  Topic: {selectedTopic}
                  <button onClick={() => setSelectedTopic(null)} className="hover:text-[var(--foreground)]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="text-xs text-[var(--muted-foreground)]">
            Showing {filteredAssets.length} {filteredAssets.length === 1 ? 'resource' : 'resources'}
          </div>

          {/* Grid */}
          {paginatedAssets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] border-dashed rounded-3xl">
              <svg className="mx-auto h-12 w-12 text-[var(--muted-foreground)] opacity-50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-lg text-[var(--foreground)] mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>No resources found</h3>
              <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto mb-6">
                We couldn't find any resources matching your criteria. Try adjusting your filters or search query.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-6 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] text-sm font-semibold rounded-xl transition-all duration-300"
              >
                Load More Resources
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative w-full max-w-md bg-[var(--card)] h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
                <h2 className="font-bold text-lg text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-lg p-2 hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Class Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Class Level</h3>
                <div className="grid grid-cols-2 gap-2">
                  {classLevels.map((cls) => (
                    <button
                      key={cls.slug}
                      onClick={() => setSelectedClass(selectedClass === cls.level ? null : cls.level)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-all border ${
                        selectedClass === cls.level
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 font-semibold'
                          : 'bg-[var(--muted)]/30 hover:bg-[var(--muted)] text-[var(--muted-foreground)] border-transparent'
                      }`}
                    >
                      <span>{cls.icon}</span>
                      <span>{cls.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div>
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto pr-1">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        selectedTopic === topic
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 font-semibold'
                          : 'bg-[var(--muted)]/30 hover:bg-[var(--muted)] text-[var(--muted-foreground)] border-transparent'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex gap-4 mt-6">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFiltersOpen(false);
                }}
                className="flex-1 py-3 border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-semibold rounded-xl text-center"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white text-sm font-semibold rounded-xl text-center"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
