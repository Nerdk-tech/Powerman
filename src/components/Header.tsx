'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, buildWhatsAppLink, buildTelLink } from '@/lib/site-config';
import { Menu, X, Phone, Search, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-lg">
      
      <div className="hidden md:block border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-navy-100">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-volt animate-pulse" />
            {SITE_CONFIG.tagline} — {SITE_CONFIG.businessHours}
          </p>
          <div className="flex items-center gap-4">
            <a href={buildTelLink()} className="flex items-center gap-1.5 hover:text-volt transition-colors">
              <Phone size={12} /> {SITE_CONFIG.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-volt transition-colors">
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>

      
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        
        <Link href="/" className="flex shrink-0 items-center" aria-label="ENERGY MAN Home">
          <Image
            src={SITE_CONFIG.logoUrl}
            alt="ENERGY MAN Batteries"
            width={160}
            height={48}
            priority
            className="h-11 w-auto md:h-12 object-contain"
          />
        </Link>

        
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-volt bg-white/5' : 'text-white/90 hover:text-volt hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button
              type="button"
              aria-expanded={catOpen}
              aria-haspopup="true"
              onClick={() => setCatOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:text-volt transition-colors"
            >
              Categories <ChevronDown size={14} className={catOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {catOpen && (
              <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
                <div className="overflow-hidden rounded-xl bg-white py-2 shadow-card-hover ring-1 ring-navy/10">
                  {SITE_CONFIG.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.id}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-4 py-2 text-sm text-charcoal hover:bg-volt-50 hover:text-navy transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/shop"
            className="rounded-full p-2.5 text-white/90 hover:bg-white/10 transition-colors"
            aria-label="Search products"
          >
            <Search size={18} />
          </Link>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-volt px-4 py-2.5 text-sm font-semibold text-navy shadow-glow hover:bg-volt-400 transition-all hover:-translate-y-0.5"
          >
            WhatsApp Us
          </a>
          <a
            href={buildTelLink()}
            className="rounded-full border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:border-volt hover:text-volt transition-colors"
          >
            Call Now
          </a>
        </div>

        
        <button
          className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      
      {open && (
        <div className="border-t border-white/10 bg-navy-800 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-medium ${
                  pathname === link.href ? 'text-volt bg-white/5' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-navy-300">Categories</p>
            {SITE_CONFIG.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-white/80 hover:text-volt"
              >
                {cat.shortName}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 px-3 pb-2">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-volt px-4 py-3 text-center text-sm font-semibold text-navy"
              >
                WhatsApp Us
              </a>
              <a
                href={buildTelLink()}
                className="flex-1 rounded-lg border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Call Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
