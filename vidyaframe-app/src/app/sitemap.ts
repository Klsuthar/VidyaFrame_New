import { MetadataRoute } from 'next';
import { assets, categories } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vidyaframe.com';

  // Base routes
  const routes = [
    '',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  // Category routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Asset routes
  const assetRoutes = assets.map((asset) => {
    const categorySlug = asset.category.toLowerCase();
    // Normalize to single-category folder
    const catFolder = categorySlug === 'chart' ? 'chart' 
                    : categorySlug === 'worksheet' ? 'worksheet'
                    : categorySlug === 'certificate' ? 'certificate'
                    : 'poster';
    
    return {
      url: `${baseUrl}/${catFolder}/${asset.slug}`,
      lastModified: new Date(asset.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...routes, ...categoryRoutes, ...assetRoutes];
}
