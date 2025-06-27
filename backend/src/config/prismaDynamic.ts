import { PrismaClient } from '@prisma/client';

export function getPrismaForSchema(schema: string) {
  // Clona a variável de ambiente e troca o schema na connection string
  const url = process.env.DATABASE_URL?.replace('schema=public', `schema=${schema}`);
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}