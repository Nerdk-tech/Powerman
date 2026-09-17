import Link from 'next/link';
import { db } from '@/lib/db';
import { Package, MessageSquare, TrendingUp, CircleSlash, ArrowRight, Inbox } from 'lucide-react';

async function getStats() {
  try {
    const [products, inStock, enquiries, newEnquiries] = await Promise.all([
      db.product.count(),
      db.product.count({ where: { inStock: true } }),
      db.enquiry.count(),
      db.enquiry.count({ where: { status: 'New' } }),
    ]);
    const recent = await db.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
    return { products, inStock, enquiries, newEnquiries, recent, dbOk: true };
  } catch {
    return { products: 0, inStock: 0, enquiries: 0, newEnquiries: 0, recent: [], dbOk: false };
  }
}

const STAT_CARDS = [
  { key: 'products', label: 'Total Products', icon: Package, hint: 'batteries in catalogue' },
  { key: 'inStock', label: 'In Stock', icon: TrendingUp, hint: 'available to sell now' },
  { key: 'enquiries', label: 'Total Enquiries', icon: MessageSquare, hint: 'all time' },
  { key: 'newEnquiries', label: 'New Enquiries', icon: Inbox, hint: 'awaiting first response' },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60">Overview of your catalogue and customer enquiries.</p>

      {!stats.dbOk && (
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Database not connected — admin data is unavailable. Follow the database setup steps in DEPLOYMENT.md.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, hint }) => (
          <div key={key} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt/15">
                <Icon size={19} className="text-volt-600" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-navy">{String(stats[key as 'products' | 'inStock' | 'enquiries' | 'newEnquiries'])}</p>
            <p className="mt-1 text-sm font-semibold text-charcoal/70">{label}</p>
            <p className="text-xs text-charcoal/45">{hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy">Recent Enquiries</h2>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-volt-600 hover:underline"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {stats.recent.length === 0 ? (
            <p className="mt-6 text-sm text-charcoal/50">No enquiries yet — they will appear here as customers send them.</p>
          ) : (
            <div className="mt-4 divide-y divide-navy/5">
              {stats.recent.map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">{e.name}</p>
                    <p className="truncate text-xs text-charcoal/55">
                      {e.productName ?? 'General enquiry'} · {e.phone}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-volt/15 px-2.5 py-1 text-[11px] font-bold uppercase text-volt-600">
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-navy p-6 shadow-card">
          <h2 className="text-base font-bold text-white">Quick Actions</h2>
          <div className="mt-4 space-y-2.5">
            <Link
              href="/admin/products/new"
              className="block rounded-xl bg-volt px-5 py-3 text-center text-sm font-bold text-navy transition-colors hover:bg-volt-400"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/products"
              className="block rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:border-volt hover:text-volt"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/enquiries"
              className="block rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:border-volt hover:text-volt"
            >
              Review Enquiries
            </Link>
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-navy-200">
            <CircleSlash size={14} className="mt-0.5 shrink-0" />
            Customers order via WhatsApp and enquiry forms — manage everything from here.
          </p>
        </div>
      </div>
    </div>
  );
}
