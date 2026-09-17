'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Battery, Bike, Truck, Sun, Zap, Factory, ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/site-config';

const USE_CASES = [
  { id: 'automotive', label: 'Car / SUV', icon: Battery },
  { id: 'motorcycle', label: 'Motorcycle / Keke', icon: Bike },
  { id: 'truck', label: 'Truck / Heavy-Duty', icon: Truck },
  { id: 'solar', label: 'Solar System', icon: Sun },
  { id: 'inverter', label: 'Inverter / Backup', icon: Zap },
  { id: 'industrial', label: 'Industrial / UPS', icon: Factory },
];

const VOLTAGES = ['Any', '12V', '24V', '48V'];

export default function FindYourBattery() {
  const router = useRouter();
  const [useCase, setUseCase] = useState<string | null>(null);
  const [voltage, setVoltage] = useState('Any');

  function handleFind() {
    const params = new URLSearchParams();
    if (useCase) params.set('category', useCase);
    if (voltage !== 'Any') params.set('voltage', voltage);
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="rounded-3xl bg-navy p-6 sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Battery Finder</p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Find Your Battery in Seconds</h2>
        <p className="mt-2 text-sm text-navy-200">
          Tell us what you&apos;re powering — we&apos;ll show you the right batteries for it.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {USE_CASES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setUseCase(useCase === id ? null : id)}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-5 transition-all ${
              useCase === id
                ? 'border-volt bg-volt/15 text-volt'
                : 'border-white/10 bg-white/5 text-navy-100 hover:border-volt/50 hover:text-volt'
            }`}
          >
            <Icon size={26} />
            <span className="text-xs font-semibold leading-tight">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-navy-200">Voltage:</label>
          <select
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="rounded-full border border-white/15 bg-navy-800 px-4 py-2.5 text-sm text-white focus:border-volt focus:outline-none"
          >
            {VOLTAGES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFind}
          disabled={!useCase}
          className="inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3 text-sm font-bold text-navy transition-all hover:bg-volt-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Show Matching Batteries <ArrowRight size={15} />
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-navy-200">
        Not sure what you need?{' '}
        <a
          href={buildWhatsAppLink('Hello ENERGY MAN, I need help choosing the right battery for my vehicle/system.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-volt underline-offset-4 hover:underline"
        >
          Talk to ENERGY MAN <MessageCircle size={13} />
        </a>
      </p>
    </div>
  );
}
