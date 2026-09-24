import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: 'Username and password are required.' }, { status: 400 });
    }

    let user;
    try {
      user = await db.adminUser.findUnique({ where: { username: String(username).trim().toLowerCase() } });
    } catch {
      return NextResponse.json({ ok: false, error: 'Database unavailable. Run the database setup first.' }, { status: 503 });
    }

    if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
      return NextResponse.json({ ok: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    await createSession(user.username);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
}
