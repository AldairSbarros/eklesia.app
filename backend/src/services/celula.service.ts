import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCelula = async (data: any) => {
  return prisma.celula.create({ data });
};

export const listCelulas = async () => {
  return prisma.celula.findMany({
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      membros: true, // Agora membros é um array de Member
      reunioes: true
    }
  });
};

export const getCelula = async (id: number) => {
  return prisma.celula.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      membros: true, // Agora membros é um array de Member
      reunioes: true
    }
  });
};

export const updateCelula = async (id: number, data: any) => {
  return prisma.celula.update({
    where: { id },
    data
  });
};

export const deleteCelula = async (id: number) => {
  return prisma.celula.delete({
    where: { id }
  });
};

// Buscar membros da célula
export const listarMembrosCelula = async (celulaId: number) => {
  return prisma.member.findMany({ where: { celulaId } });
};

// Associar membro à célula
export const addMembroCelula = async (celulaId: number, membroId: number) => {
  return prisma.member.update({
    where: { id: membroId },
    data: { celulaId }
  });
};


// Remover membro da célula
export const removeMembroCelula = async (membroId: number) => {
  return prisma.member.update({
    where: { id: membroId },
    data: { celulaId: null }
  });
};