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
      aria-hidden={false}
      role="dialog"
      aria-label="Website temporarily unavailable"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0C0F15] px-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ background: "radial-gradient(circle at 50% 30%, #ffffff 0%, transparent 60%)" }} />
      <div className="relative w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">
          <Image src="/logo.png" alt="ENERGY MAN" width={64} height={64} className="h-full w-full object-contain" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7EE7BB]">
          Energy Man Batteries
        </p>

        <h1 className="mt-4 text-3xl font-bold text-white">
          This website is temporarily unavailable
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#9AA4B2]">
          This site is paused due to an unresolved account matter between the
          site owner and the developer. We apologize to customers for the
          inconvenience.
        </p>

        <p className="mt-6 text-sm leading-relaxed text-[#9AA4B2]">
          <span className="font-semibold text-white">Site owner?</span> Please
          settle the outstanding developer balance to restore access
          immediately.
        </p>

        <a
          href="mailto:support@daminicodesphere.org?subject=Restore%20ENERGY%20MAN%20website%20access"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#7EE7BB] to-[#2fae7a] px-6 py-3 text-sm font-bold text-[#08120e] shadow-lg transition-transform hover:scale-[1.03]"
        >
          support@daminicodesphere.org
        </a>

        <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#3d4654]">
          Power You Can Depend On
        </p>
      </div>
    </div>
  );
}
