import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createLog = async (data: any) => {
  return prisma.log.create({ data });
};

export const listLogs = async () => {
  return prisma.log.findMany();
};

export const getLog = async (id: number) => {
  return prisma.log.findUnique({
    where: { id }
  });
};

export const updateLog = async (id: number, data: any) => {
  return prisma.log.update({
    where: { id },
    data
  });
};

export const deleteLog = async (id: number) => {
  return prisma.log.delete({
    where: { id }
  });
};