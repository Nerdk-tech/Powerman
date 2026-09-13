import type { Metadata } from 'next';
import { SITE_CONFIG, buildWhatsAppLink, buildTelLink } from '@/lib/site-config';
import EnquiryForm from '@/components/EnquiryForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach POWERMAN Batteries — call, WhatsApp or email us for battery availability, pricing, delivery and expert guidance.',
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, title: 'Call Us', value: SITE_CONFIG.phone, href: buildTelLink() },
    { icon: MessageCircle, title: 'WhatsApp', value: SITE_CONFIG.whatsapp, href: buildWhatsAppLink(), external: true },
    { icon: Mail, title: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: MapPin, title: 'Location', value: SITE_CONFIG.address },
    { icon: Clock, title: 'Business Hours', value: SITE_CONFIG.businessHours },
  ];

  return (
    <>
      <section className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Contact</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Get In Touch</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-200 sm:text-base">
            Questions about a battery, availability, pricing or delivery? We respond fast — call, chat or send an
            enquiry below.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-10 px-4 py-14 lg:grid lg:grid-cols-[380px_1fr]">
        
        <div className="space-y-4">
          {cards.map(({ icon: Icon, title, value, href, external }) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt/15">
                  <Icon size={20} className="text-volt-600" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-charcoal/50">{title}</span>
                  <span className="mt-0.5 block text-sm font-semibold text-navy">{value}</span>
                </span>
              </>
            );
            return href ? (
              <a
                key={title}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                {inner}
              </a>
            ) : (
              <div key={title} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5">
                {inner}
              </div>
            );
          })}
        </div>

        
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5 sm:p-8 lg:mt-0">
          <h2 className="text-xl font-extrabold text-navy">Send Us a Message</h2>
          <p className="mt-1.5 text-sm text-charcoal/60">
            Tell us what you need — we&apos;ll get back to you shortly.
          </p>
          <div className="mt-6">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </>
  );
}
