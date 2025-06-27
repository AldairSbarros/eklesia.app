import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createVisitante = async (data: any) => {
  return prisma.visitanteCelula.create({ data });
};

export const listVisitantes = async () => {
  return prisma.visitanteCelula.findMany({
    include: {
      ReuniaoCelula: true
    }
  });
};

export const getVisitante = async (id: number) => {
  return prisma.visitanteCelula.findUnique({
    where: { id },
    include: {
      ReuniaoCelula: true
    }
  });
};

export const updateVisitante = async (id: number, data: any) => {
  return prisma.visitanteCelula.update({
    where: { id },
    data
  });
};

export const deleteVisitante = async (id: number) => {
  return prisma.visitanteCelula.delete({
    where: { id }
  });
};