import { SearchPageContent } from '@/components/search/SearchPageContent';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search Educational Resources - VidyaFrame',
  description: 'Search and filter counting charts, maths worksheets, performance certificates, and classroom posters on VidyaFrame.',
  alternates: {
    canonical: 'https://vidyaframe.com/search',
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={8} /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
