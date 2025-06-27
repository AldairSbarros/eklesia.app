import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createVenda = async (data: any) => {
  return prisma.venda.create({ data });
};

export const listVendas = async () => {
  return prisma.venda.findMany({
    include: {
      Church: true,
      upgradeDe: true,
      upgrades: true,
      faturas: true
    }
  });
};

export const getVenda = async (id: number) => {
  return prisma.venda.findUnique({
    where: { id },
    include: {
      Church: true,
      upgradeDe: true,
      upgrades: true,
      faturas: true
    }
  });
};

export const updateVenda = async (id: number, data: any) => {
  return prisma.venda.update({
    where: { id },
    data
  });
};

export const deleteVenda = async (id: number) => {
  return prisma.venda.delete({
    where: { id }
  });
};