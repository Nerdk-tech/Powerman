import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import { LayoutDashboard, Package, MessageSquare, ExternalLink } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package, exact: false },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare, exact: false },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-navy-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-navy lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Image src="/logo.png" alt="POWERMAN" width={150} height={54} className="h-auto w-32" priority />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-navy-100 transition-colors hover:bg-white/5 hover:text-volt"
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 px-3 py-5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-navy-100 transition-colors hover:bg-white/5 hover:text-volt"
          >
            <ExternalLink size={17} /> View Website
          </Link>
          <AdminLogoutButton />
        </div>
        <p className="px-6 pb-4 text-[11px] text-navy-300">Signed in as {session.username}</p>
      </aside>

      <div className="flex min-h-screen w-full flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy/10 bg-white/95 px-4 backdrop-blur-sm lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Image src="/logo.png" alt="POWERMAN" width={120} height={43} className="h-auto w-24" priority />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Package size={17} className="text-volt-600" />
            <span className="text-sm font-bold text-navy">POWERMAN Admin</span>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/products"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-navy-50"
            >
              Products
            </Link>
            <Link
              href="/admin/enquiries"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-navy-50"
            >
              Enquiries
            </Link>
            <AdminLogoutButton compact />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/admin/products/new"
              className="rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-volt-400"
            >
              Add Product
            </Link>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
