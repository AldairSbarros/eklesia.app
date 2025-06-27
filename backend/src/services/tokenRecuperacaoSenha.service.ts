import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createToken = async (data: any) => {
  return prisma.tokenRecuperacaoSenha.create({ data });
};

export const listTokens = async () => {
  return prisma.tokenRecuperacaoSenha.findMany({
    include: {
      Usuario: true
    }
  });
};

export const getToken = async (id: number) => {
  return prisma.tokenRecuperacaoSenha.findUnique({
    where: { id },
    include: {
      Usuario: true
    }
  });
};

export const updateToken = async (id: number, data: any) => {
  return prisma.tokenRecuperacaoSenha.update({
    where: { id },
    data
  });
};

export const deleteToken = async (id: number) => {
  return prisma.tokenRecuperacaoSenha.delete({
    where: { id }
  });
};