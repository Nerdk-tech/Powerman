import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, buildWhatsAppLink, buildTelLink } from '@/lib/site-config';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="ENERGY MAN Batteries"
              width={133}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              {SITE_CONFIG.taglineSub}
            </p>
            <p className="mt-4 inline-block rounded-md bg-volt/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-volt">
              “{SITE_CONFIG.tagline}”
            </p>
          </div>

          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/shop" className="hover:text-volt transition-colors">Shop All Batteries</Link></li>
              <li><Link href="/about" className="hover:text-volt transition-colors">About ENERGY MAN</Link></li>
              <li><Link href="/contact" className="hover:text-volt transition-colors">Contact Us</Link></li>
              <li><Link href="/safety-tips" className="hover:text-volt transition-colors">Battery Safety Tips</Link></li>
              <li><Link href="/terms" className="hover:text-volt transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-volt transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONFIG.categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.id}`} className="hover:text-volt transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get In Touch</h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a href={buildTelLink()} className="flex items-start gap-2.5 hover:text-volt transition-colors">
                  <Phone size={15} className="mt-0.5 shrink-0 text-volt" /> {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-start gap-2.5 hover:text-volt transition-colors">
                  <Mail size={15} className="mt-0.5 shrink-0 text-volt" /> {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-volt" /> {SITE_CONFIG.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="mt-0.5 shrink-0 text-volt" /> {SITE_CONFIG.businessHours}
              </li>
            </ul>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-volt-400"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name} Batteries. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-volt" />
            Power You Can Depend On
          </p>
        </div>
      </div>
    </footer>
  );
}
