import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS } from '../src/lib/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ENERGY MAN database...');

  await prisma.enquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.siteContent.deleteMany();
  await prisma.adminUser.deleteMany();

  await prisma.siteContent.create({
    data: {
      id: 'default',
      phone: '0803 331 4277',
      whatsapp: '0803 331 4277',
      email: 'info@energymanbatteries.com',
      address: 'No 1 Babajide Close, Bariga, Lagos',
      businessHours: 'Monday – Saturday: 8:00 AM – 6:00 PM',
      promoBannerText:
        'POWER YOUR JOURNEY — Quality automotive, solar, inverter & lithium batteries available now.',
      promoBannerEnabled: true,
      heroHeadline: 'Reliable Power Starts With the Right Battery.',
      heroSubheadline:
        'Discover quality batteries and power solutions for vehicles, solar systems, inverters, businesses and everyday power needs.',
      aboutText:
        'At ENERGY MAN, we believe reliable power starts with the right battery. We are a battery sales and distribution company providing a wide range of power solutions for vehicles, solar systems, inverters, businesses and other applications.',
      missionText:
        'To provide dependable battery and energy-storage solutions while making it simple for customers to find the right power product for their needs.',
      visionText:
        'To become a trusted and recognized name in battery sales and power solutions, known for quality products, professional service and customer satisfaction.',
    },
  });

  const passwordHash = bcrypt.hashSync('EnergyMan2026!', 10);
  await prisma.adminUser.create({
    data: { username: 'admin', passwordHash },
  });
  console.log('Admin user created (username: admin)');

  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        model: p.model,
        category: p.category,
        subcategory: p.subcategory ?? null,
        price: p.price,
        discountPrice: p.discountPrice ?? null,
        inStock: p.inStock,
        voltage: p.voltage,
        capacity: p.capacity,
        cca: p.cca ?? null,
        batteryType: p.batteryType,
        dimensions: p.dimensions ?? null,
        weight: p.weight ?? null,
        terminalType: p.terminalType ?? null,
        application: p.application ?? null,
        warranty: p.warranty ?? null,
        compatibilityNotes: p.compatibilityNotes ?? null,
        manufacturer: p.manufacturer ?? null,
        countryOfOrigin: p.countryOfOrigin ?? null,
        isFeatured: p.isFeatured,
        isPublished: p.isPublished,
        sku: p.sku,
        description: p.description,
        images: JSON.stringify(p.images),
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
