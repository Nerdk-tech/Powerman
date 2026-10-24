import { NextResponse } from 'next/server';

/**
 * TEMPORARY deployment diagnostic (safe to delete).
 * Reports only the PRESENCE of database env var names, never values,
 * plus the error class from a trivial DB query.
 */
export async function GET() {
  const envNames = [
    'DATABASE_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL',
    'POSTGRES_URL_NON_POOLING',
    'DATABASE_URL_UNPOOLED',
    'NEON_DATABASE_URL',
  ];
  const envPresent = envNames.filter((n) => Boolean(process.env[n]));

  let dbError: string | null = null;
  let dbErrorCode: string | null = null;
  if (envPresent.length > 0) {
    try {
      const { db } = await import('@/lib/db');
      await (db as unknown as { $queryRawUnsafe: (q: string) => Promise<unknown> }).$queryRawUnsafe('SELECT 1');
    } catch (e) {
      const err = e as { message?: string; code?: string; error_code?: string };
      dbError = (err.message ?? String(e)).slice(0, 300);
      dbErrorCode = err.code ?? err.error_code ?? null;
    }
  }

  return NextResponse.json({
    ok: true,
    diag: 'db-status-v1',
    envPresent,
    dbReachable: envPresent.length > 0 && dbError === null,
    dbErrorCode,
    dbError,
  });
}
