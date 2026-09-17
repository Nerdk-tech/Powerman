'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

interface EnquiryFormProps {
  prefilledProduct?: string;
}

const inputCls =
  'w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30 transition-all';

export default function EnquiryForm({ prefilledProduct }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [product, setProduct] = useState(prefilledProduct ?? '');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: prefilledProduct ? 'product_enquiry' : 'contact_form' }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
      if (!prefilledProduct) setProduct('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-volt/40 bg-volt-50 p-8 text-center">
        <CheckCircle size={44} className="mx-auto text-volt-600" />
        <h3 className="mt-4 text-lg font-bold text-navy">Enquiry Received!</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Thank you. The ENERGY MAN team will contact you shortly to confirm availability, pricing and delivery.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full border border-navy/20 px-5 py-2 text-sm font-semibold text-navy hover:bg-navy-50"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-navy">Full Name *</label>
          <input id="name" name="name" required placeholder="e.g. Adewale Johnson" className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-navy">Phone Number *</label>
          <input id="phone" name="phone" type="tel" required placeholder="e.g. 0803 123 4567" className={inputCls} />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-1.5 block text-xs font-semibold text-navy">WhatsApp Number</label>
          <input id="whatsapp" name="whatsapp" type="tel" placeholder="Same as phone (optional)" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-navy">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com (optional)" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="product" className="mb-1.5 block text-xs font-semibold text-navy">Product / Service *</label>
          <input
            id="product"
            name="product"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Which battery are you interested in?"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1.5 block text-xs font-semibold text-navy">Quantity *</label>
          <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} required className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="mb-1.5 block text-xs font-semibold text-navy">Location *</label>
          <input id="location" name="location" required placeholder="e.g. Ikeja, Lagos" className={inputCls} />
        </div>
        <div>
          <label htmlFor="delivery" className="mb-1.5 block text-xs font-semibold text-navy">Preferred Delivery</label>
          <select id="delivery" name="delivery" className={inputCls} defaultValue="Pickup">
            <option>Pickup</option>
            <option>Home / Office Delivery</option>
            <option>Installation Included</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-navy">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Any extra details — vehicle model, system specs, deadlines…"
          className={inputCls}
        />
      </div>

      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again, or reach us directly on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-volt px-8 py-3.5 text-sm font-bold text-navy shadow-glow transition-all hover:bg-volt-600 hover:text-white disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {status === 'sending' ? 'Sending…' : 'Send Order Enquiry'}
      </button>
      <p className="text-xs text-charcoal/50">
        No payment required. ENERGY MAN will contact you to confirm availability, final pricing, payment and delivery.
      </p>
    </form>
  );
}
