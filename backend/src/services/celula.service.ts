import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCelula = async (data: any) => {
  return prisma.celula.create({ data });
};

export const listCelulas = async () => {
  return prisma.celula.findMany({
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      reunioes: true
    }
  });
};

export const getCelula = async (id: number) => {
  return prisma.celula.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      reunioes: true
    }
  });
};

export const updateCelula = async (id: number, data: any) => {
  return prisma.celula.update({
    where: { id },
    data
  });
};

export const deleteCelula = async (id: number) => {
  return prisma.celula.delete({
    where: { id }
  });
};