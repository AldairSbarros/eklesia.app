import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCongregacao = async (data: any) => {
  return prisma.congregacao.create({ data });
};

export const listCongregacoes = async () => {
  return prisma.congregacao.findMany();
};

export const updateCongregacao = async (id: number, data: any) => {
  return prisma.congregacao.update({
    where: { id },
    data,
  });
};

export const deleteCongregacao = async (id: number) => {
  return prisma.congregacao.delete({
    where: { id },
  });
};