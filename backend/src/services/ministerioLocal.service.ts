import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMinisterioLocal = async (data: any) => {
  return prisma.ministerioLocal.create({ data });
};

export const listMinisteriosLocais = async () => {
  return prisma.ministerioLocal.findMany({
    include: {
      Congregacao: true,
      membros: true
    }
  });
};

export const getMinisterioLocal = async (id: number) => {
  return prisma.ministerioLocal.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      membros: true
    }
  });
};

export const updateMinisterioLocal = async (id: number, data: any) => {
  return prisma.ministerioLocal.update({
    where: { id },
    data
  });
};

export const deleteMinisterioLocal = async (id: number) => {
  return prisma.ministerioLocal.delete({
    where: { id }
  });
};