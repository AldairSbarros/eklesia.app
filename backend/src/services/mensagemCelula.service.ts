import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarMensagem = async (data: any) => {
  return prisma.mensagemCelula.create({ data });
};

export const listarMensagens = async () => {
  return prisma.mensagemCelula.findMany({
    orderBy: { data: 'desc' }
  });
};

export const obterMensagem = async (id: number) => {
  return prisma.mensagemCelula.findUnique({
    where: { id }
  });
};

export const atualizarMensagem = async (id: number, data: any) => {
  return prisma.mensagemCelula.update({
    where: { id },
    data
  });
};

export const removerMensagem = async (id: number) => {
  return prisma.mensagemCelula.delete({
    where: { id }
  });
};