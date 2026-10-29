"use client";

import { useEffect } from "react";
import Image from "next/image";

/**
 * PAYMENT LOCK
 * Full-site access lock. Renders above every page and disables interaction
 * until the outstanding balance is settled and this component is removed.
 * To unlock: remove <PaymentLock /> from src/app/layout.tsx and redeploy.
 */
export default function PaymentLock() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-label="Website disabled"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0A0A0B] px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ background: "radial-gradient(circle at 50% 25%, #ff3b30 0%, transparent 60%)" }}
      />
      <div className="relative w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg grayscale">
          <Image src="/logo.png" alt="ENERGY MAN" width={64} height={64} className="h-full w-full object-contain" />
        </div>

        <p className="inline-block rounded-full border border-[#ff3b30]/40 bg-[#ff3b30]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff5c52]">
          Account suspended
        </p>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white">
          This website has been disabled
        </h1>

        <p className="mt-5 text-base leading-relaxed text-[#8b8f96]">
          The outstanding balance owed to the developer of this website has not
          been paid. Access stays switched off until the full amount is settled.
        </p>

        <p className="mt-4 text-base leading-relaxed text-[#8b8f96]">
          <span className="font-bold text-white">Site owner:</span> you know
          exactly what you owe. Pay it, and the site comes back within minutes.
          Nothing else will restore it.
        </p>

        <a
          href="mailto:support@daminicodesphere.org?subject=ENERGY%20MAN%20outstanding%20balance"
          className="mt-9 inline-flex items-center justify-center rounded-xl bg-[#ff3b30] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
        >
          support@daminicodesphere.org
        </a>

        <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-[#3a3d42]">
          ENERGY MAN Batteries · Website and hosting suspended for non-payment
        </p>
      </div>
    </div>
  );
}
