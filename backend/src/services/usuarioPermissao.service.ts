import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUsuarioPermissao = async (data: any) => {
  return prisma.usuarioPermissao.create({ data });
};

export const listUsuarioPermissoes = async () => {
  return prisma.usuarioPermissao.findMany({
    include: {
      Usuario: true,
      Permissao: true
    }
  });
};

export const getUsuarioPermissao = async (id: number) => {
  return prisma.usuarioPermissao.findUnique({
    where: { id },
    include: {
      Usuario: true,
      Permissao: true
    }
  });
};

export const updateUsuarioPermissao = async (id: number, data: any) => {
  return prisma.usuarioPermissao.update({
    where: { id },
    data
  });
};

export const deleteUsuarioPermissao = async (id: number) => {
  return prisma.usuarioPermissao.delete({
    where: { id }
  });
};