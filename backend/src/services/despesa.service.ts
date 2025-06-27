import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarDespesa = async (data: any) => {
  return prisma.despesa.create({ data });
};

export const listarDespesas = async () => {
  return prisma.despesa.findMany({
    orderBy: { data: 'desc' },
  });
};

export const atualizarDespesa = async (id: number, data: any) => {
  return prisma.despesa.update({
    where: { id },
    data,
  });
};

export const removerDespesa = async (id: number) => {
  return prisma.despesa.delete({
    where: { id },
  });
};

export const obterDespesa = async (id: number) => {
  return prisma.despesa.findUnique({
    where: { id },
  });
};