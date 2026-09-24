import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-volt">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-navy">Page Not Found</h1>
      <p className="mt-3 text-sm text-charcoal/60">
        The page you&apos;re looking for doesn&apos;t exist — but the power you need is one click away.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-volt px-7 py-3 text-sm font-bold text-navy hover:bg-volt-400 transition-colors">
          Back to Home
        </Link>
        <Link href="/shop" className="rounded-full border border-navy/20 px-7 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-colors">
          Shop Batteries
        </Link>
      </div>
    </div>
  );
}
