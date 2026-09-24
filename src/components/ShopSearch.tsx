'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function ShopSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');
  const [, startTransition] = useTransition();

  useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set('q', value.trim());
    else params.delete('q');
    startTransition(() => router.push(`/shop?${params.toString()}`));
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search batteries, brands, models, specs…"
        className="w-full rounded-full border border-navy/15 bg-white py-3.5 pl-12 pr-5 text-sm shadow-card focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30"
      />
      <Search size={18} className="pointer-events-none absolute left-4.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
    </form>
  );
}
