import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import { SITE_CONFIG, formatCurrency, buildWhatsAppLink, buildTelLink } from '@/lib/site-config';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import EnquiryForm from '@/components/EnquiryForm';
import { MessageCircle, Phone, ChevronRight, ShieldCheck, Truck, CircleCheck } from 'lucide-react';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const price = product.discountPrice ?? product.price;
  const category = SITE_CONFIG.categories.find((c) => c.id === product.category);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.isPublished
  ).slice(0, 3);

  const specs: [string, string | undefined | null][] = [
    ['Brand', product.brand],
    ['Model', product.model],
    ['SKU', product.sku],
    ['Battery Type', product.batteryType],
    ['Voltage', product.voltage],
    ['Capacity', product.capacity],
    ['Cold Cranking Amps', product.cca],
    ['Dimensions', product.dimensions],
    ['Weight', product.weight],
    ['Terminal Type', product.terminalType],
    ['Warranty', product.warranty],
    ['Manufacturer', product.manufacturer],
    ['Country of Origin', product.countryOfOrigin],
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="border-b border-navy/10 bg-navy-50/50">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-4 text-xs text-charcoal/60">
          <li><Link href="/" className="hover:text-navy">Home</Link></li>
          <li><ChevronRight size={12} /></li>
          <li><Link href="/shop" className="hover:text-navy">Shop</Link></li>
          <li><ChevronRight size={12} /></li>
          {category && (
            <>
              <li><Link href={`/shop?category=${category.id}`} className="hover:text-navy">{category.shortName}</Link></li>
              <li><ChevronRight size={12} /></li>
            </>
          )}
          <li className="max-w-[200px] truncate font-semibold text-navy sm:max-w-none">{product.name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                {product.brand}
              </span>
              {product.isFeatured && (
                <span className="rounded-full bg-volt/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-volt-600">
                  Featured
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  product.inStock ? 'bg-volt text-navy' : 'bg-charcoal text-white'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold leading-tight text-navy sm:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm text-charcoal/50">Model: {product.model} · SKU: {product.sku}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-navy">{formatCurrency(price)}</span>
              {product.discountPrice && (
                <span className="text-lg text-charcoal/40 line-through">{formatCurrency(product.price)}</span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-charcoal/75">{product.description}</p>

            {product.application && (
              <div className="mt-5 rounded-xl bg-navy-50 p-4 ring-1 ring-navy/5">
                <p className="text-xs font-bold uppercase tracking-wider text-navy">Fits / Applications</p>
                <p className="mt-1.5 text-sm text-charcoal/75">{product.application}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-volt px-6 py-4 text-sm font-bold text-navy shadow-glow transition-all hover:-translate-y-0.5 hover:bg-volt-600 hover:text-white"
              >
                <MessageCircle size={17} /> WhatsApp to Order
              </a>
              <a
                href={buildTelLink()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-navy px-6 py-4 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <Phone size={17} /> Call POWERMAN
              </a>
            </div>
            <a
              href="#enquiry"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-volt-600 underline-offset-4 hover:underline"
            >
              Or send an order enquiry form →
            </a>

            {/* Trust row */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-navy/10 pt-6">
              {[
                { icon: ShieldCheck, label: product.warranty ? `${product.warranty} Warranty` : 'Quality Guaranteed' },
                { icon: Truck, label: 'Delivery Support' },
                { icon: CircleCheck, label: 'Expert Guidance' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={20} className="text-volt-600" />
                  <span className="text-[11px] font-semibold text-charcoal/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-14">
          <h2 className="text-xl font-extrabold text-navy">Technical Specifications</h2>
          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-navy/10">
            <table className="w-full text-sm">
              <tbody>
                {specs
                  .filter(([, v]) => v && String(v).trim() !== '')
                  .map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 0 ? 'bg-navy-50/50' : 'bg-white'}>
                      <td className="w-1/3 px-5 py-3.5 font-semibold text-navy">{label}</td>
                      <td className="px-5 py-3.5 text-charcoal/80">{value}</td>
                    </tr>
                  ))}
                {product.compatibilityNotes && (
                  <tr className="bg-navy-50/50">
                    <td className="px-5 py-3.5 font-semibold text-navy">Compatibility Notes</td>
                    <td className="px-5 py-3.5 text-charcoal/80">{product.compatibilityNotes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enquiry */}
        <div id="enquiry" className="mt-14 scroll-mt-28">
          <h2 className="text-xl font-extrabold text-navy">Send an Order Enquiry</h2>
          <p className="mt-1.5 text-sm text-charcoal/60">
            No payment required — we&apos;ll confirm availability and final pricing before anything is finalized.
          </p>
          <div className="mt-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5 sm:p-8">
            <EnquiryForm prefilledProduct={product.name} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-extrabold text-navy">You May Also Need</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
