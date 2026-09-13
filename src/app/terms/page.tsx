import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the POWERMAN Batteries website and ordering products.',
};

export default function TermsPage() {
  const sections: { title: string; body: string[] }[] = [
    {
      title: '1. Website Use',
      body: [
        'By accessing and using this website, you agree to use it lawfully and for its intended purpose — browsing products and making battery enquiries. You agree not to misuse the website or interfere with its operation.',
      ],
    },
    {
      title: '2. Product Information',
      body: [
        'We make reasonable efforts to keep product descriptions, specifications, images and prices accurate. However, availability and pricing may change, and images may differ slightly from the actual product.',
      ],
    },
    {
      title: '3. Orders',
      body: [
        'Submitting an order enquiry does not automatically constitute a completed sale. An order is confirmed only after POWERMAN confirms availability, final pricing, and payment and delivery arrangements with you directly.',
      ],
    },
    {
      title: '4. Pricing',
      body: [
        'Prices shown on this website are subject to change. The final price is confirmed with you before any order is finalized.',
      ],
    },
    {
      title: '5. Availability',
      body: [
        'Products may become unavailable. If an item you enquired about is out of stock, we will inform you and may suggest suitable alternatives.',
      ],
    },
    {
      title: '6. Customer Responsibility',
      body: [
        'You are responsible for providing accurate contact and delivery information, and for confirming that a battery is suitable for your vehicle, equipment or power system before purchase.',
      ],
    },
    {
      title: '7. Installation',
      body: [
        'Battery installation should be carried out by qualified professionals where required. POWERMAN is not responsible for damage arising from incorrect installation, misuse or modification of a product.',
      ],
    },
    {
      title: '8. Warranty',
      body: [
        'Products may be covered by a manufacturer or POWERMAN warranty. Applicable warranty terms are communicated to the customer at the time of purchase.',
      ],
    },
    {
      title: '9. Website Content',
      body: [
        'The branding, images and materials on this website may not be reproduced or reused without our written authorization.',
      ],
    },
    {
      title: '10. Changes to These Terms',
      body: [
        'These terms may be updated from time to time. The current version will always be published on this website.',
      ],
    },
  ];

  return (
    <>
      <section className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Legal</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Terms &amp; Conditions</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="space-y-9 text-[15px] leading-relaxed text-charcoal/80">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-navy">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3">{p}</p>
              ))}
            </section>
          ))}
          <p className="border-t border-navy/10 pt-6 text-sm text-charcoal/60">
            Questions? Contact us at {SITE_CONFIG.email} or {SITE_CONFIG.phone}.
          </p>
        </div>
      </div>
    </>
  );
}
