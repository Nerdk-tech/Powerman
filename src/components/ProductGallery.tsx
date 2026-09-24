'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ['/images/hero-main.jpg'];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-50 shadow-card ring-1 ring-navy/10">
        <Image
          src={list[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-3">
          {list.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-24 overflow-hidden rounded-xl ring-2 transition-all ${
                active === i ? 'ring-volt' : 'ring-navy/10 hover:ring-navy/30'
              }`}
            >
              <Image src={img} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
