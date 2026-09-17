import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });

  try {
    const b = await request.json();

    for (const field of ['name', 'category', 'brand', 'sku', 'description', 'price']) {
      if (!b[field]) {
        return NextResponse.json({ ok: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    let slug = slugify(String(b.name));
    const existing = await db.product.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const product = await db.product.create({
      data: {
        slug,
        name: String(b.name),
        brand: String(b.brand),
        model: String(b.model ?? ''),
        category: String(b.category),
        subcategory: b.subcategory ? String(b.subcategory) : null,
        price: Number(b.price) || 0,
        discountPrice: b.discountPrice ? Number(b.discountPrice) : null,
        inStock: b.inStock !== false,
        voltage: String(b.voltage ?? '12V'),
        capacity: String(b.capacity ?? ''),
        cca: b.cca ? String(b.cca) : null,
        batteryType: String(b.batteryType ?? ''),
        dimensions: b.dimensions ? String(b.dimensions) : null,
        weight: b.weight ? String(b.weight) : null,
        terminalType: b.terminalType ? String(b.terminalType) : null,
        application: b.application ? String(b.application) : null,
        warranty: b.warranty ? String(b.warranty) : null,
        compatibilityNotes: b.compatibilityNotes ? String(b.compatibilityNotes) : null,
        manufacturer: b.manufacturer ? String(b.manufacturer) : null,
        countryOfOrigin: b.countryOfOrigin ? String(b.countryOfOrigin) : null,
        isFeatured: b.isFeatured === true,
        isPublished: b.isPublished !== false,
        sku: String(b.sku),
        description: String(b.description),
        images: JSON.stringify(Array.isArray(b.images) ? b.images.filter(Boolean) : []),
      },
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath('/shop');

    return NextResponse.json({ ok: true, id: product.id, slug: product.slug });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Could not save the product.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
