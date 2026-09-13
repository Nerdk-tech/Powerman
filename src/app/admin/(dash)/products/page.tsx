import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { deleteProduct, toggleProductStock, toggleProductFeatured } from '../actions';
import { SITE_CONFIG, formatCurrency } from '@/lib/site-config';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const sp = await searchParams;

  let products: Awaited<ReturnType<typeof db.product.findMany>> = [];
  let dbOk = true;
  try {
    products = await db.product.findMany({ orderBy: { createdAt: 'asc' } });
  } catch {
    dbOk = false;
  }

  const q = (sp.q ?? '').toLowerCase();
  const filtered = products.filter((p) => {
    const matchQ = !q || `${p.name} ${p.brand} ${p.model} ${p.sku}`.toLowerCase().includes(q);
    const matchCat = !sp.category || p.category === sp.category;
    return matchQ && matchCat;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Products</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            {dbOk ? `${products.length} products in your catalogue` : 'Database unavailable'}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-volt-400"
        >
          <Plus size={15} /> Add Product
        </Link>
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/admin/products" method="get">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            name="q"
            defaultValue={sp.q ?? ''}
            placeholder="Search by name, brand, model or SKU…"
            className="w-full rounded-lg border border-navy/15 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30"
          />
        </div>
        <select
          name="category"
          defaultValue={sp.category ?? ''}
          className="rounded-lg border border-navy/15 bg-white px-4 py-2.5 text-sm focus:border-volt focus:outline-none"
        >
          <option value="">All Categories</option>
          {SITE_CONFIG.categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-800"
        >
          Filter
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-navy-50/70 text-left text-xs font-bold uppercase tracking-wider text-charcoal/55">
                <th className="px-5 py-3.5">Product</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Flags</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.map((p) => {
                let images: string[] = [];
                try {
                  const parsed = JSON.parse(p.images);
                  if (Array.isArray(parsed)) images = parsed;
                } catch {}
                const img = images[0] ?? '/images/hero-main.jpg';
                return (
                  <tr key={p.id} className="hover:bg-navy-50/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-navy-50 ring-1 ring-navy/10">
                          <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-[280px] truncate font-semibold text-navy">{p.name}</p>
                          <p className="text-xs text-charcoal/50">{p.brand} · {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy">
                        {SITE_CONFIG.categories.find((c) => c.id === p.category)?.shortName ?? p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-navy">{formatCurrency(p.discountPrice ?? p.price)}</span>
                      {p.discountPrice && (
                        <span className="ml-1.5 text-xs text-charcoal/40 line-through">{formatCurrency(p.price)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <form action={toggleProductStock}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="next" value={String(!p.inStock)} />
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase transition-colors ${
                            p.inStock
                              ? 'bg-volt/20 text-volt-700 hover:bg-volt/40'
                              : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3.5">
                      <form action={toggleProductFeatured}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="next" value={String(!p.isFeatured)} />
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                            p.isFeatured
                              ? 'bg-volt text-navy hover:bg-volt-400'
                              : 'bg-navy-50 text-charcoal/50 hover:bg-navy-100'
                          }`}
                        >
                          Featured
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-bold text-navy transition-colors hover:border-volt hover:text-volt-600"
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={p.id} />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/25 px-3 py-1.5 text-xs font-bold text-destructive transition-colors hover:bg-destructive/5"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-charcoal/50">
                    No products match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
