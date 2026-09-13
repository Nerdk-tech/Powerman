import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency, buildWhatsAppLink } from '@/lib/site-config';
import type { Product } from '@/lib/products';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const price = product.discountPrice ?? product.price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-navy-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-volt">
              Featured
            </span>
          )}
          {product.discountPrice && (
            <span className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Hot Deal
            </span>
          )}
        </div>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
            product.inStock ? 'bg-volt text-navy' : 'bg-charcoal text-white'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-volt-600">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-navy transition-colors group-hover:text-volt-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs text-charcoal/60">
          {product.voltage} · {product.capacity} · {product.batteryType.split('(')[0].trim()}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-navy">{formatCurrency(price)}</span>
          {product.discountPrice && (
            <span className="text-sm text-charcoal/40 line-through">{formatCurrency(product.price)}</span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 pt-1 sm:flex-row">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/15 px-3 py-2.5 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy-50"
          >
            View Product <ArrowRight size={13} />
          </Link>
          <a
            href={buildWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-volt px-3 py-2.5 text-xs font-bold text-navy transition-all hover:bg-volt-600 hover:text-white"
          >
            <MessageCircle size={13} /> WhatsApp to Order
          </a>
        </div>
      </div>
    </div>
  );
}
