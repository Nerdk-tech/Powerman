import Image from 'next/image';
import type { Metadata } from 'next';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-card-hover">
          <div className="flex flex-col items-center">
            <Image src="/logo-dark.png" alt="ENERGY MAN" width={180} height={64} className="h-auto w-44" priority />
            <h1 className="mt-6 text-xl font-extrabold text-navy">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-charcoal/60">Sign in to manage your store</p>
          </div>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-navy-300">
          ENERGY MAN Batteries · Management access only
        </p>
      </div>
    </div>
  );
}
