import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

const STATUSES = ['New', 'Contacted', 'Awaiting Customer', 'Confirmed', 'Completed', 'Cancelled'];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const fd = await request.formData();
  const id = String(fd.get('id') ?? '');
  const status = String(fd.get('status') ?? '');
  if (!STATUSES.includes(status)) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    await db.enquiry.update({ where: { id }, data: { status } });
    revalidatePath('/admin/enquiries');
    revalidatePath('/admin');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const fd = await request.formData();
  const id = String(fd.get('id') ?? '');
  try {
    await db.enquiry.delete({ where: { id } });
    revalidatePath('/admin/enquiries');
    revalidatePath('/admin');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
