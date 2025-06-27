import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createArquivo = async (data: any) => {
  return prisma.arquivo.create({ data });
};

export const listArquivos = async () => {
  return prisma.arquivo.findMany({
    include: {
      Usuario: true
    }
  });
};

export const getArquivo = async (id: number) => {
  return prisma.arquivo.findUnique({
    where: { id },
    include: {
      Usuario: true
    }
  });
};

export const updateArquivo = async (id: number, data: any) => {
  return prisma.arquivo.update({
    where: { id },
    data
  });
};

export const deleteArquivo = async (id: number) => {
  return prisma.arquivo.delete({
    where: { id }
  });
};