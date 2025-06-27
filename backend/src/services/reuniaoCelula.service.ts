import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createReuniao = async (data: any) => {
  return prisma.reuniaoCelula.create({ data });
};

export const listReunioes = async () => {
  return prisma.reuniaoCelula.findMany({
    include: {
      Celula: true,
      presencas: true,
      visitantes: true
    }
  });
};

export const getReuniao = async (id: number) => {
  return prisma.reuniaoCelula.findUnique({
    where: { id },
    include: {
      Celula: true,
      presencas: true,
      visitantes: true
    }
  });
};

export const updateReuniao = async (id: number, data: any) => {
  return prisma.reuniaoCelula.update({
    where: { id },
    data
  });
};

export const deleteReuniao = async (id: number) => {
  return prisma.reuniaoCelula.delete({
    where: { id }
  });
};