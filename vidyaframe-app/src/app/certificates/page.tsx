import { CategoryPageContent } from '@/components/assets/CategoryPageContent';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Award Certificates Templates for Students - VidyaFrame',
  description: 'Motivate students with custom award certificates. Choose from Star of the Month, best performer, or custom student reward certificates with school logo.',
  alternates: {
    canonical: 'https://vidyaframe.com/certificates',
  },
  openGraph: {
    title: 'Award Certificates Templates for Students - VidyaFrame',
    description: 'Motivate students with custom award certificates. Choose from Star of the Month, best performer, or custom student reward certificates.',
    url: 'https://vidyaframe.com/certificates',
    type: 'website',
  },
};

export default function CertificatesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={8} /></div>}>
      <CategoryPageContent categorySlug="certificates" />
    </Suspense>
  );
}
