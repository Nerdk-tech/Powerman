'use client';

import { useState, useTransition } from 'react';
import EnquiryCard from './EnquiryCard';

type Enquiry = Parameters<typeof EnquiryCard>[0]['enquiry'];

export default function EnquiryList({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [, startTransition] = useTransition();

  function handleStatusChange(id: string, status: string) {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    startTransition(async () => {
      const fd = new FormData();
      fd.set('id', id);
      fd.set('status', status);
      await fetch('/api/admin/enquiries', { method: 'POST', body: fd });
    });
  }

  function handleDelete(id: string) {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    startTransition(async () => {
      const fd = new FormData();
      fd.set('id', id);
      await fetch('/api/admin/enquiries', { method: 'DELETE', body: fd });
    });
  }

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {enquiries.map((e) => (
        <EnquiryCard key={e.id} enquiry={e} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      ))}
    </div>
  );
}
