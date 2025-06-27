import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTurma = async (data: any) => {
  return prisma.escolaLideresTurma.create({ data });
};

export const listTurmas = async () => {
  return prisma.escolaLideresTurma.findMany({
    include: {
      Congregacao: true,
      alunos: true,
      etapas: true
    }
  });
};

export const getTurma = async (id: number) => {
  return prisma.escolaLideresTurma.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      alunos: true,
      etapas: true
    }
  });
};

export const updateTurma = async (id: number, data: any) => {
  return prisma.escolaLideresTurma.update({
    where: { id },
    data
  });
};

export const deleteTurma = async (id: number) => {
  return prisma.escolaLideresTurma.delete({
    where: { id }
  });
};

