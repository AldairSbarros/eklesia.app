import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarReceita = async (data: any) => {
  return prisma.receita.create({ data });
};

export const listarReceitas = async () => {
  return prisma.receita.findMany({
    orderBy: { data: 'desc' }
  });
};

export const obterReceita = async (id: number) => {
  return prisma.receita.findUnique({
    where: { id }
  });
};

export const atualizarReceita = async (id: number, data: any) => {
  return prisma.receita.update({
    where: { id },
    data
  });
};

export const removerReceita = async (id: number) => {
  return prisma.receita.delete({
    where: { id }
  });
};