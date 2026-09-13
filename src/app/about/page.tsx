import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_CONFIG, buildWhatsAppLink } from '@/lib/site-config';
import { Target, Eye, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'POWERMAN is a battery sales and distribution company providing dependable power solutions for vehicles, solar systems, inverters, businesses and industry.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">About Us</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Power You Can Depend On</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-200 sm:text-base">
            The story, mission and promise behind POWERMAN Batteries.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-12 px-4 py-14 lg:grid lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="text-2xl font-extrabold text-navy">Who We Are</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
            At POWERMAN, we believe reliable power starts with the right battery. We are a battery sales and
            distribution company providing a wide range of power solutions for vehicles, solar systems, inverters,
            businesses and other applications.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
            Our product range includes automotive batteries, motorcycle batteries, truck and heavy-duty batteries,
            solar batteries, inverter batteries, lithium batteries, industrial batteries and battery accessories.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
            Our goal is to make it easier for customers to find dependable battery solutions that match their
            specific needs. Whether you need a replacement battery for your vehicle, an energy-storage solution
            for your solar system, backup power for your home or business, or a heavy-duty battery for demanding
            applications, POWERMAN is here to help. We are committed to providing quality products, helpful
            customer service and reliable support from product selection to purchase.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-navy-50 p-6 ring-1 ring-navy/5">
              <Target size={24} className="text-volt-600" />
              <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-navy">Mission</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                To provide dependable battery and energy-storage solutions while making it simple for customers to
                find the right power product for their needs.
              </p>
            </div>
            <div className="rounded-2xl bg-navy-50 p-6 ring-1 ring-navy/5">
              <Eye size={24} className="text-volt-600" />
              <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-navy">Vision</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                To become a trusted and recognized name in battery sales and power solutions, known for quality
                products, professional service and customer satisfaction.
              </p>
            </div>
            <div className="rounded-2xl bg-navy p-6 ring-1 ring-navy">
              <Zap size={24} className="text-volt" />
              <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-white">Our Promise</h3>
              <p className="mt-2 text-xs leading-relaxed text-navy-200">Power You Can Depend On.</p>
            </div>
          </div>
        </div>

        <aside className="mt-10 lg:mt-0">
          <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-navy/5">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/hero-mechanic.jpg"
                alt="POWERMAN — quality batteries and power solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="bg-navy p-6">
              <h3 className="text-base font-bold text-white">Let&apos;s find your battery.</h3>
              <p className="mt-2 text-xs leading-relaxed text-navy-200">
                Browse the full catalogue or talk to our team — we&apos;ll help you pick the right battery for your
                vehicle, solar system, inverter or equipment.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href="/shop"
                  className="rounded-full bg-volt px-5 py-3 text-center text-sm font-bold text-navy transition-colors hover:bg-volt-400"
                >
                  Shop Batteries
                </Link>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:border-volt hover:text-volt"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <p className="mt-5 text-[11px] text-navy-300">
                {SITE_CONFIG.businessHours} · {SITE_CONFIG.address}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
