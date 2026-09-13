import Link from 'next/link';
import { Suspense } from 'react';
import { PRODUCTS } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site-config';
import ProductCard from '@/components/ProductCard';
import ShopSearch from '@/components/ShopSearch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Batteries',
  description:
    'Browse the full POWERMAN range — automotive, motorcycle, solar, inverter, lithium, heavy-duty, industrial batteries and accessories. Order directly on WhatsApp.',
};

type SearchParams = {
  q?: string;
  category?: string;
  brand?: string;
  voltage?: string;
  maxPrice?: string;
  availability?: string;
  sort?: string;
};

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
];

const PRICE_RANGES = [
  { label: 'Under ₦50,000', value: '50000' },
  { label: 'Under ₦100,000', value: '100000' },
  { label: 'Under ₦250,000', value: '250000' },
  { label: 'Any price', value: '' },
];

function filterProducts(sp: SearchParams) {
  let list = PRODUCTS.filter((p) => p.isPublished);

  if (sp.category) list = list.filter((p) => p.category === sp.category);
  if (sp.brand) list = list.filter((p) => p.brand === sp.brand);
  if (sp.voltage) list = list.filter((p) => p.voltage === sp.voltage);
  if (sp.maxPrice) list = list.filter((p) => (p.discountPrice ?? p.price) <= Number(sp.maxPrice));
  if (sp.availability === 'in') list = list.filter((p) => p.inStock);
  if (sp.availability === 'out') list = list.filter((p) => !p.inStock);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    list = list.filter((p) =>
      [p.name, p.brand, p.model, p.description, p.subcategory, p.capacity, p.voltage, p.sku]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }

  switch (sp.sort) {
    case 'price-asc':
      list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
      break;
    case 'price-desc':
      list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
      break;
    case 'newest':
      list = [...list].reverse();
      break;
    default:
      list = [...list].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
  return list;
}

function buildHref(current: SearchParams, patch: SearchParams): string {
  const params = new URLSearchParams();
  const merged = { ...current, ...patch };
  Object.entries(merged).forEach(([k, v]) => {
    if (v) params.set(k, String(v));
  });
  const qs = params.toString();
  return qs ? `/shop?${qs}` : '/shop';
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const products = filterProducts(sp);
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
  const activeCategory = SITE_CONFIG.categories.find((c) => c.id === sp.category);
  const hasFilters = Boolean(sp.q || sp.category || sp.brand || sp.voltage || sp.maxPrice || sp.availability || sp.sort);

  return (
    <>
      {/* Header band */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">The POWERMAN Catalogue</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            {activeCategory ? activeCategory.name : 'Shop Batteries'}
          </h1>
          <p className="mt-2 text-sm text-navy-200">
            {products.length} product{products.length !== 1 && 's'} available
            {activeCategory ? ` in ${activeCategory.name}` : ' across all categories'} — order directly on WhatsApp.
          </p>
          <div className="mt-6">
            <Suspense>
              <ShopSearch />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-10 lg:grid lg:grid-cols-[240px_1fr]">
        {/* Sidebar filters */}
        <aside className="mb-8 lg:mb-0">
          <div className="sticky top-28 space-y-7 rounded-2xl bg-navy-50/60 p-5 ring-1 ring-navy/5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Category</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <Link
                    href={buildHref(sp, { category: '' })}
                    className={!sp.category ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                  >
                    All Categories
                  </Link>
                </li>
                {SITE_CONFIG.categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={buildHref(sp, { category: c.id })}
                      className={sp.category === c.id ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                    >
                      {c.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Brand</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {brands.map((b) => (
                  <li key={b}>
                    <Link
                      href={buildHref(sp, { brand: sp.brand === b ? '' : b })}
                      className={sp.brand === b ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                    >
                      {b}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Price Range</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {PRICE_RANGES.map((r) => (
                  <li key={r.label}>
                    <Link
                      href={buildHref(sp, { maxPrice: r.value })}
                      className={sp.maxPrice === r.value && r.value !== '' ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Voltage</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {['12V', '24V', '48V'].map((v) => (
                  <li key={v}>
                    <Link
                      href={buildHref(sp, { voltage: sp.voltage === v ? '' : v })}
                      className={sp.voltage === v ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                    >
                      {v}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Availability</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <Link
                    href={buildHref(sp, { availability: sp.availability === 'in' ? '' : 'in' })}
                    className={sp.availability === 'in' ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                  >
                    In Stock
                  </Link>
                </li>
                <li>
                  <Link
                    href={buildHref(sp, { availability: sp.availability === 'out' ? '' : 'out' })}
                    className={sp.availability === 'out' ? 'font-bold text-volt-600' : 'text-charcoal/70 hover:text-navy'}
                  >
                    Out of Stock
                  </Link>
                </li>
              </ul>
            </div>

            {hasFilters && (
              <Link
                href="/shop"
                className="inline-block rounded-full border border-navy/20 px-4 py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition-colors"
              >
                Clear All Filters
              </Link>
            )}
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">Sort:</span>
            {SORTS.map((s) => (
              <Link
                key={s.id}
                href={buildHref(sp, { sort: s.id })}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  (sp.sort ?? 'featured') === s.id
                    ? 'bg-navy text-volt'
                    : 'bg-navy-50 text-charcoal/70 hover:bg-navy-100'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl bg-navy-50 p-12 text-center ring-1 ring-navy/5">
              <p className="text-lg font-bold text-navy">No batteries match your search.</p>
              <p className="mt-2 text-sm text-charcoal/60">Try a different filter, or talk to us — we can source it.</p>
              <Link href="/shop" className="mt-5 inline-block rounded-full bg-volt px-6 py-2.5 text-sm font-bold text-navy">
                Reset Filters
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
