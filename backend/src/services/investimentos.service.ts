import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarInvestimento = async (data: any) => {
  return prisma.investimento.create({ data });
};

export const listarInvestimentos = async () => {
  return prisma.investimento.findMany({
    orderBy: { data: 'desc' }
  });
};

export const atualizarInvestimento = async (id: number, data: any) => {
  return prisma.investimento.update({
    where: { id },
    data
  });
};

export const removerInvestimento = async (id: number) => {
  return prisma.investimento.delete({
    where: { id }
  });
};

export const obterInvestimento = async (id: number) => {
  return prisma.investimento.findUnique({
    where: { id }
  });
};