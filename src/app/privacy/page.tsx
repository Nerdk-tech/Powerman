import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How POWERMAN Batteries collects, uses and protects your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Legal</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Privacy Policy</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14">

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-charcoal/80">
          <section>
            <h2 className="text-lg font-bold text-navy">1. Information We Collect</h2>
            <p className="mt-3">When you browse our website or submit an enquiry, we may collect:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Your name, phone number and WhatsApp number</li>
              <li>Your email address</li>
              <li>Your contact or delivery location</li>
              <li>Product enquiries and order information</li>
              <li>Messages you send to us</li>
              <li>Technical website-usage information (device, browser, pages visited)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">2. How We Use Information</h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Respond to your enquiries and provide customer support</li>
              <li>Process and manage orders, and confirm product availability</li>
              <li>Communicate important service information to you</li>
              <li>Improve our products, services and website</li>
              <li>Maintain the security of our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">3. Information Sharing</h2>
            <p className="mt-3">
              We do not sell your personal information. We may share your information with service providers as
              necessary to operate our business (for example, delivery partners), and when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">4. Security &amp; Cookies</h2>
            <p className="mt-3">
              We take reasonable steps to protect your personal information. Our website may use cookies for
              functionality and analytics. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">5. Your Rights</h2>
            <p className="mt-3">
              Subject to applicable law, you may request access to, correction of, or deletion of your personal
              information. To exercise these rights, contact us at{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-volt-600">{SITE_CONFIG.email}</a> or{' '}
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-semibold text-volt-600">{SITE_CONFIG.phone}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">6. Contact</h2>
            <p className="mt-3">
              Questions about this policy? Reach us at {SITE_CONFIG.email}, {SITE_CONFIG.phone}, or{' '}
              {SITE_CONFIG.address}.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
