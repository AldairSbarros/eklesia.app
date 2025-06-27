import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createEncontro = async (data: any) => {
  return prisma.encontro.create({ data });
};

export const listEncontros = async () => {
  return prisma.encontro.findMany({
    include: {
      Congregacao: true,
      participantes: true
    }
  });
};

export const getEncontro = async (id: number) => {
  return prisma.encontro.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      participantes: true
    }
  });
};

export const updateEncontro = async (id: number, data: any) => {
  return prisma.encontro.update({
    where: { id },
    data
  });
};

export const deleteEncontro = async (id: number) => {
  return prisma.encontro.delete({
    where: { id }
  });
};