import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ['name', 'phone', 'product', 'quantity', 'location'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json({ ok: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    try {
      await db.enquiry.create({
        data: {
          name: String(body.name).trim(),
          phone: String(body.phone).trim(),
          whatsapp: body.whatsapp ? String(body.whatsapp).trim() : null,
          email: body.email ? String(body.email).trim() : null,
          productName: String(body.product).trim(),
          quantity: Number(body.quantity) || 1,
          location: String(body.location).trim(),
          preferredDelivery: body.preferredDelivery ? String(body.preferredDelivery) : null,
          message: body.message ? String(body.message).trim() : null,
          source: body.source ? String(body.source) : 'contact_form',
          status: 'New',
        },
      });
    } catch {}

    return NextResponse.json({ ok: true, message: 'Enquiry received. We will contact you shortly.' });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
}
