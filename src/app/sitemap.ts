import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://powerman-batteries.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/shop', '/about', '/contact', '/safety-tips', '/privacy', '/terms'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
