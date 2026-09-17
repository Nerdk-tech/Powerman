'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CircleAlert, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import type { Product } from '@/lib/products';

const INPUT =
  'w-full rounded-lg border border-navy/15 bg-navy-50/40 px-4 py-2.5 text-sm focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30';
const LABEL = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy';

export default function ProductForm({ product }: { product?: Product & { dbId?: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(product?.name ?? '');
  const [images, setImages] = useState((product?.images ?? []).join('\n'));
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isPublished, setIsPublished] = useState(product?.isPublished ?? true);

  const isEdit = Boolean(product);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      name: fd.get('name'),
      category: fd.get('category'),
      brand: fd.get('brand'),
      model: fd.get('model'),
      sku: fd.get('sku'),
      voltage: fd.get('voltage'),
      capacity: fd.get('capacity'),
      batteryType: fd.get('batteryType'),
      description: fd.get('description'),
      price: Number(fd.get('price')) || 0,
      inStock,
      isFeatured,
      isPublished,
      images: images
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    };

    const optional = ['subcategory', 'discountPrice', 'cca', 'dimensions', 'weight', 'terminalType', 'application', 'warranty', 'compatibilityNotes', 'manufacturer', 'countryOfOrigin'];
    for (const key of optional) {
      const v = fd.get(key);
      if (v !== null && String(v).trim() !== '') payload[key] = key === 'discountPrice' ? Number(v) : String(v);
    }

    try {
      const res = await fetch(isEdit ? `/api/admin/products/${product!.dbId ?? product!.id}` : '/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not save the product.');
        setSaving(false);
        return;
      }
      router.push('/admin/products');
      router.refresh();
    } catch {
      setError('Network error while saving.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          <CircleAlert size={16} /> {error}
        </div>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
        <h2 className="text-base font-bold text-navy">Basic Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL}>Product Name</label>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. ENERGY MAN Pro 75Ah Car Battery" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Category</label>
            <select name="category" defaultValue={product?.category ?? 'automotive'} className={INPUT}>
              {SITE_CONFIG.categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL}>Subcategory</label>
            <input name="subcategory" defaultValue={product?.subcategory ?? ''} placeholder="e.g. Car Batteries" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Brand</label>
            <input name="brand" defaultValue={product?.brand ?? 'ENERGY MAN'} required className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Model</label>
            <input name="model" defaultValue={product?.model ?? ''} placeholder="e.g. EM-AUTO-75MF" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>SKU</label>
            <input name="sku" defaultValue={product?.sku ?? ''} required placeholder="e.g. EM-AUTO-001" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Country of Origin</label>
            <input name="countryOfOrigin" defaultValue={product?.countryOfOrigin ?? ''} placeholder="e.g. South Korea" className={INPUT} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Description</label>
            <textarea name="description" defaultValue={product?.description ?? ''} required rows={4} placeholder="What makes this battery a great choice?" className={INPUT} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
        <h2 className="text-base font-bold text-navy">Pricing &amp; Availability</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Price (₦)</label>
            <input name="price" type="number" min="0" step="100" defaultValue={product?.price ?? ''} required className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Discount Price (₦) — optional</label>
            <input name="discountPrice" type="number" min="0" step="100" defaultValue={product?.discountPrice ?? ''} className={INPUT} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Warranty</label>
            <input name="warranty" defaultValue={product?.warranty ?? ''} placeholder="e.g. 12 Months" className={INPUT} />
          </div>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-navy">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-4 w-4 accent-[#9EE722]" />
              In Stock
            </label>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-navy">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 accent-[#9EE722]" />
              Featured on Homepage
            </label>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-navy">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 accent-[#9EE722]" />
              Published
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
        <h2 className="text-base font-bold text-navy">Technical Specifications</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Voltage</label>
            <input name="voltage" defaultValue={product?.voltage ?? '12V'} required className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Capacity</label>
            <input name="capacity" defaultValue={product?.capacity ?? ''} required placeholder="e.g. 75Ah" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Cold Cranking Amps</label>
            <input name="cca" defaultValue={product?.cca ?? ''} placeholder="e.g. 650 CCA" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Battery Type</label>
            <input name="batteryType" defaultValue={product?.batteryType ?? ''} required placeholder="e.g. Sealed Maintenance-Free" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Dimensions</label>
            <input name="dimensions" defaultValue={product?.dimensions ?? ''} placeholder="e.g. 278 x 175 x 190 mm" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Weight</label>
            <input name="weight" defaultValue={product?.weight ?? ''} placeholder="e.g. 17.8 kg" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Terminal Type</label>
            <input name="terminalType" defaultValue={product?.terminalType ?? ''} placeholder="e.g. Standard DIN" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Manufacturer</label>
            <input name="manufacturer" defaultValue={product?.manufacturer ?? ''} className={INPUT} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Fits / Applications</label>
            <input name="application" defaultValue={product?.application ?? ''} placeholder="e.g. Toyota Camry, Honda Accord, sedans" className={INPUT} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Compatibility Notes</label>
            <input name="compatibilityNotes" defaultValue={product?.compatibilityNotes ?? ''} placeholder="e.g. Fits vehicles requiring 65-75Ah capacity" className={INPUT} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
        <h2 className="text-base font-bold text-navy">Product Photos</h2>
        <p className="mt-1 text-xs text-charcoal/55">
          One image path per line. Available images live in <code className="rounded bg-navy-50 px-1.5 py-0.5">/images/</code> — e.g. /images/prod-auto-1.jpg
        </p>
        <textarea
          value={images}
          onChange={(e) => setImages(e.target.value)}
          rows={5}
          placeholder={'/images/prod-auto-1.jpg\n/images/cat-automotive.jpg'}
          className={`${INPUT} mt-3 font-mono`}
        />
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="rounded-full border border-navy/20 px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-volt px-8 py-3 text-sm font-bold text-navy transition-all hover:bg-volt-400 disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
