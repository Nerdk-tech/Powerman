import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, buildWhatsAppLink, buildTelLink } from '@/lib/site-config';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import FindYourBattery from '@/components/FindYourBattery';
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Layers,
  UserCheck,
  Headphones,
  BadgeCheck,
  ArrowRight,
  Zap,
  Truck,
  Wrench,
} from 'lucide-react';

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.isFeatured && p.isPublished).slice(0, 8);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/images/hero-main.jpg"
          alt="Quality batteries"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-volt">
              <Zap size={13} /> {SITE_CONFIG.tagline}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reliable Power Starts With the{' '}
              <span className="text-volt">Right Battery.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
              Discover quality batteries and power solutions for vehicles, solar systems, inverters,
              businesses and everyday power needs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-volt px-8 py-4 text-sm font-bold text-navy shadow-glow transition-all hover:-translate-y-0.5 hover:bg-volt-400"
              >
                Shop Batteries <ArrowRight size={16} />
              </Link>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-volt hover:text-volt"
              >
                <MessageCircle size={16} /> Chat With Us on WhatsApp
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-navy-200">
              <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-volt" /> Genuine quality products</span>
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-volt" /> Nationwide delivery support</span>
              <span className="flex items-center gap-1.5"><Wrench size={14} className="text-volt" /> Expert guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORY GRID ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-600">What do you need power for?</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Shop by Category</h2>
          <p className="mt-3 text-sm text-charcoal/60 sm:text-base">
            From motorcycles to mega machinery — the right battery for every job.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-card ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="rounded-full bg-volt/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-volt backdrop-blur-sm">
                    {cat.count}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">{cat.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy-100">{cat.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-volt opacity-0 transition-opacity group-hover:opacity-100">
                    Browse <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-navy-50 bg-grid-pattern py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-600">Handpicked for you</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Featured Batteries</h2>
              <p className="mt-2 max-w-xl text-sm text-charcoal/60">
                Best-sellers and top-value picks, ready to order on WhatsApp.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMO BANNER ============ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/images/prod-auto-3.jpg"
          alt="Automotive batteries"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Limited stock available</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              POWER YOUR JOURNEY — Quality automotive batteries available now.
            </h2>
          </div>
          <Link
            href="/shop?category=automotive"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-sm font-bold text-navy shadow-glow transition-all hover:-translate-y-0.5"
          >
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-600">Why POWERMAN</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Why Choose POWERMAN?</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: ShieldCheck, title: 'Quality Products', text: 'We stock dependable, genuine batteries from trusted manufacturers.' },
            { icon: Layers, title: 'Wide Range', text: 'Automotive, solar, inverter, lithium, heavy-duty and industrial — all under one roof.' },
            { icon: UserCheck, title: 'Expert Guidance', text: 'Not sure what you need? Our team helps you pick the right battery for your exact use.' },
            { icon: MessageCircle, title: 'Direct Customer Service', text: 'Order directly on WhatsApp or by phone — no accounts, no middlemen.' },
            { icon: Headphones, title: 'Reliable Support', text: 'We stand with you from selection through purchase and beyond.' },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-navy/5 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-volt/15">
                <Icon size={22} className="text-volt-600" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FIND YOUR BATTERY ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:pb-20">
        <FindYourBattery />
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Get Powered?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy-200 sm:text-base">
            Reach out now — confirm availability and pricing in minutes, straight from your phone.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-volt px-8 py-4 text-sm font-bold text-navy shadow-glow transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <a
              href={buildTelLink()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-volt hover:text-volt"
            >
              <Phone size={16} /> Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
