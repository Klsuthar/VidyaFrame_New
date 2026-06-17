import { CategoryPageContent } from '@/components/assets/CategoryPageContent';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Educational Classroom Posters - VidyaFrame',
  description: 'Brighten your classroom with beautifully designed wall posters for maths and basic concepts. High-resolution downloads in A4/A3 printable sizes.',
  alternates: {
    canonical: 'https://vidyaframe.com/posters',
  },
  openGraph: {
    title: 'Educational Classroom Posters - VidyaFrame',
    description: 'Brighten your classroom with beautifully designed wall posters for maths and basic concepts.',
    url: 'https://vidyaframe.com/posters',
    type: 'website',
  },
};

export default function PostersPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={8} /></div>}>
      <CategoryPageContent categorySlug="posters" />
    </Suspense>
  );
}
