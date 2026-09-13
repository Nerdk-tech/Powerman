import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let row = null;
  try {
    row = await db.product.findUnique({ where: { id: params.id } });
  } catch {}
  if (!row) notFound();

  let images: string[] = [];
  try {
    const parsed = JSON.parse(row.images);
    if (Array.isArray(parsed)) images = parsed;
  } catch {}

  const product = {
    ...row,
    subcategory: row.subcategory ?? undefined,
    discountPrice: row.discountPrice ?? undefined,
    cca: row.cca ?? undefined,
    dimensions: row.dimensions ?? undefined,
    weight: row.weight ?? undefined,
    terminalType: row.terminalType ?? undefined,
    application: row.application ?? undefined,
    warranty: row.warranty ?? undefined,
    compatibilityNotes: row.compatibilityNotes ?? undefined,
    manufacturer: row.manufacturer ?? undefined,
    countryOfOrigin: row.countryOfOrigin ?? undefined,
    images,
  };

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-charcoal/60">
        <Link href="/admin/products" className="font-semibold hover:text-navy">Products</Link>
        <ChevronRight size={12} />
        <span className="max-w-[220px] truncate font-semibold text-navy">{row.name}</span>
      </nav>
      <h1 className="mt-3 text-2xl font-extrabold text-navy">Edit Product</h1>
      <p className="mt-1 text-sm text-charcoal/60">Update details — changes appear on the website immediately.</p>
      <div className="mt-8 max-w-3xl">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
