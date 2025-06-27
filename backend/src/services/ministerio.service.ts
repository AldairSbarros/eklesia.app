import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMinisterio = async (data: any) => {
  return prisma.ministerio.create({ data });
};

export const listMinisterios = async () => {
  return prisma.ministerio.findMany({
    include: {
      Congregacao: true,
      Lider: true,
      membros: true
    }
  });
};

export const getMinisterio = async (id: number) => {
  return prisma.ministerio.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      Lider: true,
      membros: true
    }
  });
};

export const updateMinisterio = async (id: number, data: any) => {
  return prisma.ministerio.update({
    where: { id },
    data
  });
};

export const deleteMinisterio = async (id: number) => {
  return prisma.ministerio.delete({
    where: { id }
  });
};