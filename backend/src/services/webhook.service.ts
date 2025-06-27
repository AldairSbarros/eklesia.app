import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createWebhook = async (data: any) => {
  return prisma.webhook.create({ data });
};

export const listWebhooks = async () => {
  return prisma.webhook.findMany();
};

export const getWebhook = async (id: number) => {
  return prisma.webhook.findUnique({
    where: { id }
  });
};

export const updateWebhook = async (id: number, data: any) => {
  return prisma.webhook.update({
    where: { id },
    data
  });
};

export const deleteWebhook = async (id: number) => {
  return prisma.webhook.delete({
    where: { id }
  });
};