// POWERMAN Central Site Configuration
// All contact details, brand metadata, and default content live here.
// To update contact info across the entire website, modify the fields below.

export const SITE_CONFIG = {
  name: 'POWERMAN',
  tagline: 'Power You Can Depend On',
  taglineSub: 'Quality Batteries & Power Solutions for Vehicles, Solar Systems, Inverters & Industry',
  description:
    'POWERMAN is a premier battery sales and distribution company in Nigeria, delivering dependable automotive, solar, inverter, lithium, motorcycle, heavy-duty, and industrial batteries.',

  // ==== REPLACE THESE PLACEHOLDERS with the client's real contact details ====
  phone: '+234 800 123 4567',
  phoneRaw: '+2348001234567',
  whatsapp: '+234 800 123 4567',
  whatsappRaw: '2348001234567',
  email: 'info@powermanbatteries.com',
  address: 'Lagos, Nigeria — full address coming soon',
  businessHours: 'Monday – Saturday: 8:00 AM – 6:00 PM',

  // Brand visuals
  logoUrl: '/logo.png',
  fallbackLogoText: 'POWERMAN BATTERIES',

  // Social Links (Placeholders)
  socials: {
    facebook: 'https://facebook.com/powermanbatteries',
    instagram: 'https://instagram.com/powermanbatteries',
    twitter: 'https://twitter.com/powermanng',
    linkedin: 'https://linkedin.com/company/powermanbatteries',
  },

  // Categories definition
  categories: [
    {
      id: 'automotive',
      name: 'Automotive Batteries',
      shortName: 'Automotive',
      description: 'Reliable starting power for passenger cars, SUVs, buses, and commercial vans.',
      image: '/images/cat-automotive.jpg',
      count: '6+ Models',
    },
    {
      id: 'motorcycle',
      name: 'Motorcycle Batteries',
      shortName: 'Motorcycle',
      description: 'Dependable, high-cranking power for motorcycles, scooters, and tricycles (keke).',
      image: '/images/cat-motorcycle.jpg',
      count: '3+ Models',
    },
    {
      id: 'truck',
      name: 'Truck & Heavy-Duty',
      shortName: 'Heavy-Duty',
      description: 'Maximum vibration resistance and heavy-duty power for trucks, trailers, and equipment.',
      image: '/images/cat-truck.jpg',
      count: '4+ Models',
    },
    {
      id: 'solar',
      name: 'Solar Batteries',
      shortName: 'Solar',
      description: 'Deep-cycle solar energy storage batteries built for long cycle life and high efficiency.',
      image: '/images/cat-solar.jpg',
      count: '5+ Models',
    },
    {
      id: 'inverter',
      name: 'Inverter Batteries',
      shortName: 'Inverter',
      description: 'Heavy-duty backup power batteries for home, office, and business inverter systems.',
      image: '/images/cat-inverter.jpg',
      count: '4+ Models',
    },
    {
      id: 'lithium',
      name: 'Lithium Batteries',
      shortName: 'Lithium',
      description: 'Modern, high-efficiency LiFePO4 energy storage packs with fast charging and deep discharge.',
      image: '/images/cat-lithium.jpg',
      count: '3+ Models',
    },
    {
      id: 'industrial',
      name: 'Industrial & UPS',
      shortName: 'Industrial',
      description: 'Critical power backup batteries for UPS systems, telecom towers, and industrial plants.',
      image: '/images/cat-industrial.jpg',
      count: '3+ Models',
    },
    {
      id: 'accessories',
      name: 'Battery Accessories',
      shortName: 'Accessories',
      description: 'Essential chargers, heavy-duty cables, brass terminals, testers, and battery boxes.',
      image: '/images/cat-accessories.jpg',
      count: '5+ Essentials',
    },
  ],
};

// Formatting helpers
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('NGN', '₦');
}

export function buildWhatsAppLink(productName?: string, customMessage?: string): string {
  let text = customMessage;
  if (!text) {
    if (productName) {
      text = `Hello POWERMAN, I am interested in ${productName}. Please confirm availability and price.`;
    } else {
      text = `Hello POWERMAN, I have an enquiry about your batteries and power solutions.`;
    }
  }
  return `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

export function buildTelLink(phoneRaw = SITE_CONFIG.phoneRaw): string {
  return `tel:${phoneRaw}`;
}
