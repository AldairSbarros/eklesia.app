import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPastor = async (data: any) => {
  return prisma.pastor.create({ data });
};

export const listPastores = async () => {
  return prisma.pastor.findMany({
    include: {
      churchPrincipal: true,
      congregacoes: true
    }
  });
};

export const getPastor = async (id: number) => {
  return prisma.pastor.findUnique({
    where: { id },
    include: {
      churchPrincipal: true,
      congregacoes: true
    }
  });
};

export const updatePastor = async (id: number, data: any) => {
  return prisma.pastor.update({
    where: { id },
    data
  });
};

export const deletePastor = async (id: number) => {
  return prisma.pastor.delete({
    where: { id }
  });
};