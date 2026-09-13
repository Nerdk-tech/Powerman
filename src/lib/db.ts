import { PrismaClient } from '@prisma/client';
import { ensureDatabase } from './bootstrap';

function resolveDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.NEON_DATABASE_URL ||
    '';
  if (url) process.env.DATABASE_URL = url;
  return process.env.DATABASE_URL ?? '';
}

resolveDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof createDb> | undefined };

function createDb() {
  const client = new PrismaClient({ log: ['error'] });
  return client.$extends({
    query: {
      $allOperations: async ({ args, query }) => {
        await ensureDatabase(client);
        return query(args);
      },
    },
  });
}

export const db = globalForPrisma.prisma ?? createDb();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
