import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPresenca = async (data: any) => {
  return prisma.presencaCelula.create({ data });
};

export const listPresencas = async () => {
  return prisma.presencaCelula.findMany({
    include: {
      Member: true,
      ReuniaoCelula: true
    }
  });
};

export const getPresenca = async (id: number) => {
  return prisma.presencaCelula.findUnique({
    where: { id },
    include: {
      Member: true,
      ReuniaoCelula: true
    }
  });
};

export const updatePresenca = async (id: number, data: any) => {
  return prisma.presencaCelula.update({
    where: { id },
    data
  });
};

export const deletePresenca = async (id: number) => {
  return prisma.presencaCelula.delete({
    where: { id }
  });
};

export const listarPresencasPorReuniao = async (reuniaoId: number) => {
  return prisma.presencaCelula.findMany({
    where: { reuniaoId },
    include: { Member: true }
  });
};

export const registrarOuAtualizarPresenca = async (reuniaoId: number, membroId: number, presente: boolean) => {
  return prisma.presencaCelula.upsert({
    where: {
      presenca_unica: { // Use o nome do índice único definido no Prisma
        reuniaoId,
        membroId
      }
    },
    update: { presente },
    create: { reuniaoId, membroId, presente }
  });
};

export default {
  createPresenca,
  listPresencas,
  getPresenca,
  updatePresenca,
  deletePresenca,
  listarPresencasPorReuniao,
  registrarOuAtualizarPresenca
};