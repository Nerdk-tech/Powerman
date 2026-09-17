export const SITE_CONFIG = {
  name: 'ENERGY MAN',
  tagline: 'Power You Can Depend On',
  taglineSub: 'Quality Batteries & Power Solutions for Vehicles, Solar Systems, Inverters & Industry',
  description:
    'ENERGY MAN is a premier battery sales and distribution company in Nigeria, delivering dependable automotive, solar, inverter, lithium, motorcycle, heavy-duty, and industrial batteries.',

  phone: '0803 331 4277',
  phoneRaw: '+2348033314277',
  whatsapp: '0803 331 4277',
  whatsappRaw: '2348033314277',
  email: 'info@energymanbatteries.com',
  address: 'No 1 Babajide Close, Bariga, Lagos',
  businessHours: 'Monday – Saturday: 8:00 AM – 6:00 PM',

  logoUrl: '/logo.png',
  fallbackLogoText: 'ENERGY MAN BATTERIES',

  socials: {
    facebook: 'https://facebook.com/energymanbatteries',
    instagram: 'https://instagram.com/energymanbatteries',
    twitter: 'https://twitter.com/energymanng',
    linkedin: 'https://linkedin.com/company/energymanbatteries',
  },

  categories: [
    {
      id: 'automotive',
      name: 'Automotive Batteries',
      shortName: 'Automotive',
      description: 'Reliable starting power for passenger cars, SUVs, buses, and commercial vans.',
      image: '/images/cat-automotive.jpg',
      count: '7 Options',
    },
    {
      id: 'motorcycle',
      name: 'Motorcycle Batteries',
      shortName: 'Motorcycle',
      description: 'Dependable, high-cranking power for motorcycles, scooters, and tricycles (keke).',
      image: '/images/cat-motorcycle.jpg',
      count: '7 Options',
    },
    {
      id: 'truck',
      name: 'Truck & Heavy-Duty',
      shortName: 'Heavy-Duty',
      description: 'Maximum vibration resistance and heavy-duty power for trucks, trailers, and equipment.',
      image: '/images/cat-truck.jpg',
      count: '7 Options',
    },
    {
      id: 'solar',
      name: 'Solar Batteries',
      shortName: 'Solar',
      description: 'Deep-cycle solar energy storage batteries built for long cycle life and high efficiency.',
      image: '/images/cat-solar.jpg',
      count: '7 Options',
    },
    {
      id: 'inverter',
      name: 'Inverter Batteries',
      shortName: 'Inverter',
      description: 'Heavy-duty backup power batteries for home, office, and business inverter systems.',
      image: '/images/cat-inverter.jpg',
      count: '7 Options',
    },
    {
      id: 'lithium',
      name: 'Lithium Batteries',
      shortName: 'Lithium',
      description: 'Modern, high-efficiency LiFePO4 energy storage packs with fast charging and deep discharge.',
      image: '/images/cat-lithium.jpg',
      count: '7 Options',
    },
    {
      id: 'industrial',
      name: 'Industrial & UPS',
      shortName: 'Industrial',
      description: 'Critical power backup batteries for UPS systems, telecom towers, and industrial plants.',
      image: '/images/cat-industrial.jpg',
      count: '7 Options',
    },
    {
      id: 'accessories',
      name: 'Battery Accessories',
      shortName: 'Accessories',
      description: 'Essential chargers, heavy-duty cables, brass terminals, testers, and battery boxes.',
      image: '/images/cat-accessories.jpg',
      count: '7 Options',
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
      text = `Hello ENERGY MAN, I am interested in ${productName}. Please confirm availability and price.`;
    } else {
      text = `Hello ENERGY MAN, I have an enquiry about your batteries and power solutions.`;
    }
  }
  return `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

export function buildTelLink(phoneRaw = SITE_CONFIG.phoneRaw): string {
  return `tel:${phoneRaw}`;
}
