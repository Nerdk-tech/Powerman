import { db } from './db';
import { PRODUCTS, type Product } from './products';

function fromDb(row: {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string | null;
  price: number;
  discountPrice: number | null;
  inStock: boolean;
  voltage: string;
  capacity: string;
  cca: string | null;
  batteryType: string;
  dimensions: string | null;
  weight: string | null;
  terminalType: string | null;
  application: string | null;
  warranty: string | null;
  compatibilityNotes: string | null;
  manufacturer: string | null;
  countryOfOrigin: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  sku: string;
  description: string;
  images: string;
}): Product {
  let images: string[] = [];
  try {
    const parsed = JSON.parse(row.images);
    if (Array.isArray(parsed)) images = parsed.filter((x) => typeof x === 'string' && x.length > 0);
  } catch {
    images = [];
  }
  if (images.length === 0) images = ['/images/hero-main.jpg'];
  return {
    ...row,
    subcategory: row.subcategory ?? null,
    discountPrice: row.discountPrice ?? null,
    cca: row.cca ?? null,
    dimensions: row.dimensions ?? null,
    weight: row.weight ?? null,
    terminalType: row.terminalType ?? null,
    application: row.application ?? null,
    warranty: row.warranty ?? null,
    compatibilityNotes: row.compatibilityNotes ?? null,
    manufacturer: row.manufacturer ?? null,
    countryOfOrigin: row.countryOfOrigin ?? null,
    images,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.product.findMany({ orderBy: { createdAt: 'asc' } });
    if (rows.length > 0) return rows.map(fromDb);
  } catch {}
  return PRODUCTS;
}

export async function getPublishedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isPublished);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const row = await db.product.findUnique({ where: { slug } });
    if (row) return fromDb(row);
  } catch {}
  return PRODUCTS.find((p) => p.slug === slug);
}
