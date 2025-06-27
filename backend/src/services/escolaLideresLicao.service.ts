import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLicao = async (data: any) => {
  return prisma.escolaLideresLicao.create({ data });
};

export const listLicoes = async () => {
  return prisma.escolaLideresLicao.findMany({
    include: {
      EscolaLideresEtapa: true
    }
  });
};

export const getLicao = async (id: number) => {
  return prisma.escolaLideresLicao.findUnique({
    where: { id },
    include: {
      EscolaLideresEtapa: true
    }
  });
};

export const updateLicao = async (id: number, data: any) => {
  return prisma.escolaLideresLicao.update({
    where: { id },
    data
  });
};

export const deleteLicao = async (id: number) => {
  return prisma.escolaLideresLicao.delete({
    where: { id }
  });
};    

export default {
  createLicao,
  listLicoes,
  getLicao,
  updateLicao,
  deleteLicao
};