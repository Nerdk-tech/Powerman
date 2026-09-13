import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS } from './products';

const DDL: string[] = [
  `CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "voltage" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "cca" TEXT,
    "batteryType" TEXT NOT NULL,
    "dimensions" TEXT,
    "weight" TEXT,
    "terminalType" TEXT,
    "application" TEXT,
    "warranty" TEXT,
    "compatibilityNotes" TEXT,
    "manufacturer" TEXT,
    "countryOfOrigin" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sku" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Enquiry" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT,
    "productSlug" TEXT,
    "productName" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "location" TEXT,
    "preferredDelivery" TEXT,
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'product_page',
    "status" TEXT NOT NULL DEFAULT 'New',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SiteContent" (
    "id" TEXT PRIMARY KEY DEFAULT 'default',
    "phone" TEXT NOT NULL DEFAULT '+234 800 123 4567',
    "whatsapp" TEXT NOT NULL DEFAULT '+234 800 123 4567',
    "email" TEXT NOT NULL DEFAULT 'info@powermanbatteries.com',
    "address" TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
    "businessHours" TEXT NOT NULL DEFAULT 'Monday - Saturday: 8:00 AM - 6:00 PM',
    "promoBannerText" TEXT NOT NULL DEFAULT '',
    "promoBannerEnabled" BOOLEAN NOT NULL DEFAULT true,
    "heroHeadline" TEXT NOT NULL DEFAULT '',
    "heroSubheadline" TEXT NOT NULL DEFAULT '',
    "aboutText" TEXT NOT NULL DEFAULT '',
    "missionText" TEXT NOT NULL DEFAULT '',
    "visionText" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

function isUniqueViolation(e: unknown): boolean {
  return typeof e === 'object' && e !== null && 'code' in e && (e as { code?: string }).code === 'P2002';
}

async function retryOnce(fn: () => Promise<unknown>): Promise<void> {
  try {
    await fn();
  } catch {
    await new Promise((r) => setTimeout(r, 1200));
    try {
      await fn();
    } catch {}
  }
}

async function seedIfEmpty(client: PrismaClient): Promise<void> {
  const productCount = await client.product.count();
  if (productCount === 0) {
    for (const p of PRODUCTS) {
      try {
        await client.product.create({
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
      } catch (e) {
        if (!isUniqueViolation(e)) throw e;
      }
    }
  }

  const adminCount = await client.adminUser.count();
  if (adminCount === 0) {
    try {
      await client.adminUser.create({
        data: { username: 'admin', passwordHash: bcrypt.hashSync('PowerMan2026!', 10) },
      });
    } catch (e) {
      if (!isUniqueViolation(e)) throw e;
    }
  }

  const contentCount = await client.siteContent.count();
  if (contentCount === 0) {
    try {
      await client.siteContent.create({
        data: {
          id: 'default',
          phone: '0803 331 4277',
          whatsapp: '0803 331 4277',
          email: 'info@powermanbatteries.com',
          address: 'No 1 Babajide Close, Bariga, Lagos',
          businessHours: 'Monday – Saturday: 8:00 AM – 6:00 PM',
          promoBannerText:
            'POWER YOUR JOURNEY — Quality automotive, solar, inverter & lithium batteries available now.',
          promoBannerEnabled: true,
          heroHeadline: 'Reliable Power Starts With the Right Battery.',
          heroSubheadline:
            'Discover quality batteries and power solutions for vehicles, solar systems, inverters, businesses and everyday power needs.',
          aboutText:
            'At POWERMAN, we believe reliable power starts with the right battery. We are a battery sales and distribution company providing a wide range of power solutions for vehicles, solar systems, inverters, businesses and other applications.',
          missionText:
            'To provide dependable battery and energy-storage solutions while making it simple for customers to find the right power product for their needs.',
          visionText:
            'To become a trusted and recognized name in battery sales and power solutions, known for quality products, professional service and customer satisfaction.',
        },
      });
    } catch (e) {
      if (!isUniqueViolation(e)) throw e;
    }
  }
}

async function bootstrap(client: PrismaClient): Promise<void> {
  const url = process.env.DATABASE_URL ?? '';
  if (!url) throw new Error('DATABASE_URL is not set');

  let tablesExist = false;
  try {
    await client.$queryRawUnsafe('SELECT 1 FROM "Product" LIMIT 1');
    tablesExist = true;
  } catch {
    tablesExist = false;
  }

  if (!tablesExist) {
    for (const stmt of DDL) {
      await retryOnce(() => client.$executeRawUnsafe(stmt));
    }
  }

  await seedIfEmpty(client);
}

let ready: Promise<void> | null = null;

export function ensureDatabase(client: PrismaClient): Promise<void> {
  if (!ready) {
    ready = bootstrap(client).catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}
