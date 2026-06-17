import { CategoryPageContent } from '@/components/assets/CategoryPageContent';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Educational Charts for Primary Classes - VidyaFrame',
  description: 'Browse, brand, and download premium educational charts for counting, shapes, addition, and other maths topics. Designed for Nursery to Class 5 classes.',
  alternates: {
    canonical: 'https://vidyaframe.com/charts',
  },
  openGraph: {
    title: 'Educational Charts for Primary Classes - VidyaFrame',
    description: 'Browse, brand, and download premium educational charts for counting, shapes, addition, and other maths topics.',
    url: 'https://vidyaframe.com/charts',
    type: 'website',
  },
};

export default function ChartsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={8} /></div>}>
      <CategoryPageContent categorySlug="charts" />
    </Suspense>
  );
}
