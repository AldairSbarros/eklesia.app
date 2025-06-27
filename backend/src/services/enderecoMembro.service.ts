import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createEndereco = async (data: any) => {
  return prisma.enderecoMembro.create({ data });
};

export const listEnderecos = async () => {
  return prisma.enderecoMembro.findMany({
    include: {
      member: true
    }
  });
};

export const getEndereco = async (id: number) => {
  return prisma.enderecoMembro.findUnique({
    where: { id },
    include: {
      member: true
    }
  });
};

export const updateEndereco = async (id: number, data: any) => {
  return prisma.enderecoMembro.update({
    where: { id },
    data
  });
};

export const deleteEndereco = async (id: number) => {
  return prisma.enderecoMembro.delete({
    where: { id }
  });
};

