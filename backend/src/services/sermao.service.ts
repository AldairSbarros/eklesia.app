import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSermao = async (data: any) => {
  return prisma.sermao.create({ data });
};

export const listSermaos = async () => {
  return prisma.sermao.findMany();
};

export const getSermao = async (id: number) => {
  return prisma.sermao.findUnique({
    where: { id }
  });
};

export const updateSermao = async (id: number, data: any) => {
  return prisma.sermao.update({
    where: { id },
    data
  });
};

export const deleteSermao = async (id: number) => {
  return prisma.sermao.delete({
    where: { id }
  });
};