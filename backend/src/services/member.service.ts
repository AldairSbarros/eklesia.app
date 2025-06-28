import { PrismaClient } from '@prisma/client';
import { enviarWhatsAppTwilio } from './twilio.service';
const prisma = new PrismaClient();

export const createMember = async (data: any) => {
  // Busca a congregação pelo nome (caso venha no data)
  let congregacaoId = data.congregacaoId;
  if (!congregacaoId && data.congregacaoNome) {
    const congregacao = await prisma.congregacao.findFirst({
      where: { nome: data.congregacaoNome }
    });
    if (!congregacao) throw new Error('Congregação não encontrada.');
    congregacaoId = congregacao.id;
  }
  const membro = await prisma.member.create({
    data: {
      nome: data.nome,
      congregacaoId,
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
      dataNascimento: data.dataNascimento,
      whatsapp: data.whatsapp,
    }
  });
  // Envio automático de mensagem de boas-vindas
  if (data.whatsapp) {
    await enviarWhatsAppTwilio(data.whatsapp, `Olá ${data.nome}, seja bem-vindo à nossa igreja!`);
  }

  return membro;

};

export const listMembers = async (congregacaoId?: number) => {
  const where: any = {};
  if (congregacaoId) where.congregacaoId = congregacaoId;
  return prisma.member.findMany({
    where,
    select: {
      id: true,
      nome: true,
      congregacaoId: true
    }
  });
};

export const getMember = async (id: number) => {
  return prisma.member.findUnique({
    where: { id }
  });
};

export const updateMember = async (id: number, data: any) => {
  return prisma.member.update({
    where: { id },
    data
  });
};

export const deleteMember = async (id: number) => {
  return prisma.member.delete({
    where: { id }
  });
};