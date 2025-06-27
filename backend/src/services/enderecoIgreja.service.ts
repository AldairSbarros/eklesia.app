import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createEnderecoIgreja = async (data: any) => {
  return prisma.enderecoIgreja.create({ data });
};

export const listEnderecosIgreja = async () => {
  return prisma.enderecoIgreja.findMany({
    include: {
      igrejas: true
    }
  });
};

export const getEnderecoIgreja = async (id: number) => {
  return prisma.enderecoIgreja.findUnique({
    where: { id },
    include: {
      igrejas: true
    }
  });
};

export const updateEnderecoIgreja = async (id: number, data: any) => {
  return prisma.enderecoIgreja.update({
    where: { id },
    data
  });
};

export const deleteEnderecoIgreja = async (id: number) => {
  return prisma.enderecoIgreja.delete({
    where: { id }
  });
};