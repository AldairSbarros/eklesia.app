import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registrarLog({
  usuarioId,
  acao,
  detalhes,
  ip
}: {
  usuarioId?: number;
  acao: string;
  detalhes?: string;
  ip?: string;
}) {
  await prisma.logAcesso.create({
    data: { usuarioId, acao, detalhes, ip }
  });
}