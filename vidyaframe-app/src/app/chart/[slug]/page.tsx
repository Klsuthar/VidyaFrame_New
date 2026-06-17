import { AssetDetailPageContent } from '@/components/assets/AssetDetailPageContent';
import { Metadata } from 'next';
import { getAssetBySlug } from '@/lib/data';
import { Suspense } from 'react';
import { AssetGridSkeleton } from '@/components/shared/LoadingStates';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) return { title: 'Asset Not Found - VidyaFrame' };
  
  return {
    title: `${asset.title} - Download & Customize | VidyaFrame`,
    description: asset.description,
    openGraph: {
      title: `${asset.title} - Download & Customize | VidyaFrame`,
      description: asset.description,
      images: [{ url: asset.imagePreviewUrl }],
      type: 'article',
    },
    alternates: {
      canonical: `https://vidyaframe.com/chart/${slug}`,
    },
  };
}

export default async function ChartDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24"><AssetGridSkeleton count={4} /></div>}>
      <AssetDetailPageContent assetSlug={slug} />
    </Suspense>
  );
}
