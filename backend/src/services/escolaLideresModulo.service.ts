import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createModulo = async (data: any) => {
  return prisma.escolaLideresLicao.create({ data });
};

export const listModulos = async () => {
  return prisma.escolaLideresLicao.findMany();
};

export const getModulo = async (id: number) => {
  return prisma.escolaLideresLicao.findUnique({
    where: { id }
  });
};

export const deleteModulo = async (id: number) => {
  return prisma.escolaLideresLicao.delete({
    where: { id }
  });
};

export function updateModulo(arg0: number, body: any) {
  throw new Error('Function not implemented.');
}
