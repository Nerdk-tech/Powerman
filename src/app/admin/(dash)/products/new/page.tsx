import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-charcoal/60">
        <Link href="/admin/products" className="font-semibold hover:text-navy">Products</Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-navy">Add New</span>
      </nav>
      <h1 className="mt-3 text-2xl font-extrabold text-navy">Add New Product</h1>
      <p className="mt-1 text-sm text-charcoal/60">Fill in the battery details — it goes live on the website immediately.</p>
      <div className="mt-8 max-w-3xl">
        <ProductForm />
      </div>
    </div>
  );
}
