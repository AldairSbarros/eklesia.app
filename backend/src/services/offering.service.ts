import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOffering = async (data: any) => {
  return prisma.offering.create({ data });
};

export const listOfferings = async (where: any = {}) => {
  return prisma.offering.findMany({
    where,
    include: { Member: true, Congregacao: true }
  });
};

export const updateOffering = async (id: number, data: any) => {
  return prisma.offering.update({
    where: { id },
    data
  });
};

export const removeOffering = async (id: number) => {
  return prisma.offering.delete({
    where: { id }
  });
};

export const getOffering = async (id: number) => {
  return prisma.offering.findUnique({
    where: { id },
    include: { Member: true, Congregacao: true }
  });
};

export const listReceipts = async (where: any = {}) => {
  return prisma.offering.findMany({
    where,
    select: {
      id: true,
      memberId: true,
      value: true,
      date: true,
      service: true,
      receiptPhoto: true
    }
  });
};