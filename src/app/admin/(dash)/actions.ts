'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

const STATUSES = ['New', 'Contacted', 'Awaiting Customer', 'Confirmed', 'Completed', 'Cancelled'];

export async function updateEnquiryStatus(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));
  if (!STATUSES.includes(status)) return;
  try {
    await db.enquiry.update({ where: { id }, data: { status } });
    revalidatePath('/admin/enquiries');
    revalidatePath('/admin');
  } catch {}
}

export async function deleteEnquiry(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get('id'));
  try {
    await db.enquiry.delete({ where: { id } });
    revalidatePath('/admin/enquiries');
    revalidatePath('/admin');
  } catch {}
}

export async function deleteProduct(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get('id'));
  try {
    await db.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath('/shop');
  } catch {}
}

export async function toggleProductStock(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get('id'));
  const next = String(formData.get('next')) === 'true';
  try {
    await db.product.update({ where: { id }, data: { inStock: next } });
    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath('/shop');
  } catch {}
}

export async function toggleProductFeatured(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get('id'));
  const next = String(formData.get('next')) === 'true';
  try {
    await db.product.update({ where: { id }, data: { isFeatured: next } });
    revalidatePath('/admin/products');
    revalidatePath('/');
  } catch {}
}
