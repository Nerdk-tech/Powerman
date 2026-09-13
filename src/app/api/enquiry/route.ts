import { NextResponse } from 'next/server';

// Demo-phase enquiry endpoint.
// Validates the enquiry and returns success. In Phase 2 (admin panel),
// this will persist to the database and surface in the admin dashboard.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ['name', 'phone', 'product', 'quantity', 'location'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json({ ok: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    console.log('[POWERMAN ENQUIRY]', {
      ...body,
      source: body.source || 'contact_form',
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, message: 'Enquiry received. We will contact you shortly.' });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
}
