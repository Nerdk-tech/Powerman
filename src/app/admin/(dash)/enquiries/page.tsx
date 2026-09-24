import { db } from '@/lib/db';
import EnquiryList from '@/components/admin/EnquiryList';
import { Inbox } from 'lucide-react';

export default async function AdminEnquiriesPage() {
  let enquiries: Awaited<ReturnType<typeof db.enquiry.findMany>> = [];
  let dbOk = true;
  try {
    enquiries = await db.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    dbOk = false;
  }

  const serializable = enquiries.map((e) => ({
    id: e.id,
    name: e.name,
    createdAt: e.createdAt.toISOString(),
    productName: e.productName,
    quantity: e.quantity,
    phone: e.phone,
    email: e.email,
    location: e.location,
    message: e.message,
    source: e.source,
    status: e.status,
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy">Enquiries</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {dbOk
          ? `${enquiries.length} customer ${enquiries.length === 1 ? 'enquiry' : 'enquiries'} — respond via phone or WhatsApp.`
          : 'Database unavailable'}
      </p>

      {!dbOk && (
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Database not connected — enquiries appear here once the database is set up (see DEPLOYMENT.md).
        </div>
      )}

      {dbOk && enquiries.length === 0 && (
        <div className="mt-8 flex flex-col items-center rounded-2xl bg-white p-14 text-center shadow-card ring-1 ring-navy/5">
          <Inbox size={32} className="text-volt-600" />
          <p className="mt-3 text-base font-bold text-navy">No enquiries yet</p>
          <p className="mt-1 text-sm text-charcoal/55">
            When customers send order enquiries from the website, they appear here.
          </p>
        </div>
      )}

      {serializable.length > 0 && <EnquiryList initialEnquiries={serializable} />}
    </div>
  );
}
