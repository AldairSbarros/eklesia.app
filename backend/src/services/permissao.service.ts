import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPermissao = async (data: any) => {
  return prisma.permissao.create({ data });
};

export const listPermissoes = async () => {
  return prisma.permissao.findMany({
    include: {
      usuarios: true
    }
  });
};

export const getPermissao = async (id: number) => {
  return prisma.permissao.findUnique({
    where: { id },
    include: {
      usuarios: true
    }
  });
};

export const updatePermissao = async (id: number, data: any) => {
  return prisma.permissao.update({
    where: { id },
    data
  });
};

export const deletePermissao = async (id: number) => {
  return prisma.permissao.delete({
    where: { id }
  });
};