import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createNotificacao = async (data: any) => {
  return prisma.notificacao.create({ data });
};

export const listNotificacoes = async () => {
  return prisma.notificacao.findMany({
    include: {
      Usuario: true
    }
  });
};

export const getNotificacao = async (id: number) => {
  return prisma.notificacao.findUnique({
    where: { id },
    include: {
      Usuario: true
    }
  });
};

export const updateNotificacao = async (id: number, data: any) => {
  return prisma.notificacao.update({
    where: { id },
    data
  });
};

export const deleteNotificacao = async (id: number) => {
  return prisma.notificacao.delete({
    where: { id }
  });
};

export function create(arg0: string, create: any) {
    throw new Error('Function not implemented.');
}
export function list(arg0: string, list: any) {
    throw new Error('Function not implemented.');
}

export function get(arg0: string, get: any) {
    throw new Error('Function not implemented.');
}

export function update(arg0: string, update: any) {
    throw new Error('Function not implemented.');
}



export function remove(arg0: string, remove: any) {
    throw new Error('Function not implemented.');
}

