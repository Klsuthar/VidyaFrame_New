import { CategoryPageContent } from '@/components/assets/CategoryPageContent';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Printable Practice Worksheets for primary classes - VidyaFrame',
  description: 'Download interactive and printable practice worksheets for maths, sorting, patterns, and operations. Apply your school logo for custom branding instantly.',
  alternates: {
    canonical: 'https://vidyaframe.com/worksheets',
  },
  openGraph: {
    title: 'Printable Practice Worksheets - VidyaFrame',
    description: 'Download interactive and printable practice worksheets for maths, sorting, patterns, and operations.',
    url: 'https://vidyaframe.com/worksheets',
    type: 'website',
  },
};

export default function WorksheetsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={8} /></div>}>
      <CategoryPageContent categorySlug="worksheets" />
    </Suspense>
  );
}
