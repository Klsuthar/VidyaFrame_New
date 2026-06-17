'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchAssets, classLevels, categories } from '@/lib/data';
import { AssetCard } from '@/components/assets/AssetCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const initialClass = searchParams.get('class') || '';
  const initialCategory = searchParams.get('category') || '';

  // Search states
  const [query, setQuery] = useState(initialQuery);
  const [searchVal, setSearchVal] = useState(initialQuery);
  const [selectedClass, setSelectedClass] = useState<string | null>(initialClass || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

  // Sync state with URL updates (e.g. when header search triggers a navigation)
  useEffect(() => {
    setQuery(initialQuery);
    setSearchVal(initialQuery);
    setSelectedClass(initialClass || null);
    setSelectedCategory(initialCategory || null);
  }, [initialQuery, initialClass, initialCategory]);

  // Execute search filtering
  const results = useMemo(() => {
    return searchAssets(query, {
      category: selectedCategory || undefined,
      classLevel: selectedClass || undefined,
    });
  }, [query, selectedCategory, selectedClass]);

  // Update query params in address bar when state changes
  const updateUrl = (newQuery: string, newClass: string | null, newCat: string | null) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set('q', newQuery);
    if (newClass) params.set('class', newClass);
    if (newCat) params.set('category', newCat);
    router.push(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchVal);
    updateUrl(searchVal, selectedClass, selectedCategory);
  };

  const handleClassFilter = (cls: string | null) => {
    setSelectedClass(cls);
    updateUrl(query, cls, selectedCategory);
  };

  const handleCategoryFilter = (cat: string | null) => {
    setSelectedCategory(cat);
    updateUrl(query, selectedClass, cat);
  };

  const resetAllFilters = () => {
    setQuery('');
    setSearchVal('');
    setSelectedClass(null);
    setSelectedCategory(null);
    router.push('/search');
  };

  // Popular search tags suggested if nothing found
  const popularSuggestions = ['Counting', 'Shapes', 'Worksheet 1 to 5', 'AB Pattern', 'Star of the Month'];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Search <span className="gradient-text">Resources</span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
          Search over 15,000 printable educational charts, worksheets, and certificates.
        </p>
      </div>

      {/* Main Search input bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12 relative flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Type counting chart, addition worksheet, awards certificate..."
            className="w-full text-base rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-3.5 pl-12 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 shadow-lg shadow-black/5 transition-all font-medium"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          className="px-6 py-3.5 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 active:scale-[0.98] transition-all shrink-0"
        >
          Search
        </button>
      </form>

      {/* Advanced Filter Pills */}
      <div className="flex flex-col gap-4 pb-6 mb-8 border-b border-[var(--border)]">
        {/* Category filtering row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] shrink-0">
            Category:
          </span>
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              !selectedCategory
                ? 'bg-[var(--foreground)] text-[var(--background)] border-transparent'
                : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryFilter(selectedCategory === cat.slug ? null : cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20 font-bold'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}s</span>
            </button>
          ))}
        </div>

        {/* Class level filtering row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] shrink-0">
            Class Level:
          </span>
          <button
            onClick={() => handleClassFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              !selectedClass
                ? 'bg-[var(--foreground)] text-[var(--background)] border-transparent'
                : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            All Classes
          </button>
          {classLevels.map((cls) => (
            <button
              key={cls.slug}
              onClick={() => handleClassFilter(selectedClass === cls.level ? null : cls.level)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all shrink-0 flex items-center gap-1.5 ${
                selectedClass === cls.level
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20 font-bold'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              <span>{cls.icon}</span>
              <span>{cls.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Title Area */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-semibold text-[var(--muted-foreground)]">
          {results.length > 0 ? (
            <>
              Found <span className="text-[var(--foreground)] font-bold">{results.length}</span> matching results
            </>
          ) : (
            'No matching resources'
          )}
        </h2>
        {(query || selectedClass || selectedCategory) && (
          <button
            onClick={resetAllFilters}
            className="text-xs text-[var(--primary)] hover:underline font-semibold"
          >
            Reset all search filters
          </button>
        )}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] border-dashed rounded-3xl max-w-2xl mx-auto">
          <svg className="mx-auto h-14 w-14 text-[var(--muted-foreground)] opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="font-semibold text-xl text-[var(--foreground)] mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>No results found</h3>
          <p className="text-sm text-[var(--muted-foreground)] px-6 max-w-md mx-auto mb-8">
            We couldn't find anything matching "{query}". Try checking your spelling or adjusting the category and class filters.
          </p>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Popular searches you can try:
            </h4>
            <div className="flex flex-wrap justify-center gap-2 px-6">
              {popularSuggestions.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setSearchVal(term);
                    updateUrl(term, selectedClass, selectedCategory);
                  }}
                  className="px-3 py-1.5 text-xs bg-[var(--muted)]/50 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] rounded-full transition-all border border-transparent font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
