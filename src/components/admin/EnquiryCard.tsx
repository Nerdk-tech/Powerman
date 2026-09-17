'use client';

import { Trash2 } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Awaiting Customer', 'Confirmed', 'Completed', 'Cancelled'];

export default function EnquiryCard({
  enquiry,
  onStatusChange,
  onDelete,
}: {
  enquiry: {
    id: string;
    name: string;
    createdAt: string;
    productName: string | null;
    quantity: number;
    phone: string;
    email: string | null;
    location: string | null;
    message: string | null;
    source: string;
    status: string;
  };
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const created = new Date(enquiry.createdAt).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-navy">{enquiry.name}</p>
          <p className="mt-0.5 text-xs text-charcoal/50">{created}</p>
        </div>
        <select
          value={enquiry.status}
          onChange={(e) => onStatusChange(enquiry.id, e.target.value)}
          className="shrink-0 rounded-full border border-navy/15 bg-navy-50 px-3 py-1.5 text-xs font-bold text-navy focus:border-volt focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-1.5 text-sm">
        <p><span className="font-semibold text-navy">Product:</span> <span className="text-charcoal/75">{enquiry.productName ?? 'General enquiry'}</span></p>
        <p><span className="font-semibold text-navy">Quantity:</span> <span className="text-charcoal/75">{enquiry.quantity}</span></p>
        <p><span className="font-semibold text-navy">Phone:</span> <span className="text-charcoal/75">{enquiry.phone}</span></p>
        {enquiry.email && <p><span className="font-semibold text-navy">Email:</span> <span className="text-charcoal/75">{enquiry.email}</span></p>}
        <p><span className="font-semibold text-navy">Location:</span> <span className="text-charcoal/75">{enquiry.location}</span></p>
        {enquiry.message && <p className="rounded-lg bg-navy-50 p-3 text-charcoal/75">{enquiry.message}</p>}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy/10 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
          via {enquiry.source}
        </span>
        <button
          onClick={() => onDelete(enquiry.id)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive transition-colors hover:text-destructive/70"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}
