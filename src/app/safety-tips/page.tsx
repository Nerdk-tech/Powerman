import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, BatteryCharging, Wrench, Ban, Baby, PlugZap, TriangleAlert, PackageOpen, Recycle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Battery Safety Tips',
  description:
    'Essential battery safety guidance from ENERGY MAN — choosing the right battery, safe handling, charging, and disposal.',
};

const TIPS = [
  {
    icon: BatteryCharging,
    title: 'Confirm battery suitability',
    text: 'Always confirm that a battery is suitable for your vehicle, equipment or power system before purchase or installation.',
  },
  {
    icon: Wrench,
    title: 'Check the specifications',
    text: 'Check the required voltage, capacity, dimensions and terminal configuration for your application before buying a replacement.',
  },
  {
    icon: PlugZap,
    title: 'Confirm system compatibility',
    text: 'For solar and inverter systems, confirm that the battery is compatible with the rest of your system (charger, inverter, cabling).',
  },
  {
    icon: ShieldAlert,
    title: 'Follow installation instructions',
    text: 'Follow the manufacturer\u2019s installation instructions and use qualified technicians when necessary.',
  },
  {
    icon: Ban,
    title: 'Never short-circuit terminals',
    text: 'Do not short-circuit battery terminals or place metal objects across exposed terminals.',
  },
  {
    icon: Baby,
    title: 'Keep away from children & heat',
    text: 'Keep batteries away from children, excessive heat and sources of ignition.',
  },
  {
    icon: BatteryCharging,
    title: 'Use the right charger',
    text: 'Use a charger designed for the specific battery type and follow the recommended charging requirements.',
  },
  {
    icon: TriangleAlert,
    title: 'Watch for damage',
    text: 'Do not use batteries that are leaking, swollen, cracked, severely damaged or behaving abnormally.',
  },
  {
    icon: PackageOpen,
    title: 'Never open or modify',
    text: 'Do not attempt to open, repair or modify a damaged battery yourself.',
  },
  {
    icon: Recycle,
    title: 'Dispose responsibly',
    text: 'For disposal or recycling, follow applicable local requirements and manufacturer guidance.',
  },
];

export default function SafetyTipsPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Stay Safe</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Battery Safety Tips</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-200 sm:text-base">
            A battery is powerful equipment. Follow these simple guidelines to stay safe and get the best life from
            your battery.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {TIPS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt/15">
                <Icon size={20} className="text-volt-600" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-navy">{title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-charcoal/65">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-navy-50 p-6 text-center ring-1 ring-navy/5">
          <p className="text-sm text-charcoal/75">
            Not sure whether a battery is right for your setup?{' '}
            <Link href="/contact" className="font-bold text-volt-600 underline-offset-4 hover:underline">
              Talk to the ENERGY MAN team
            </Link>{' '}
            — expert guidance is always free.
          </p>
        </div>
      </div>
    </>
  );
}
