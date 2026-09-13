'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/5"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-navy-100 transition-colors hover:bg-white/5 hover:text-volt"
    >
      <LogOut size={17} /> Logout
    </button>
  );
}
