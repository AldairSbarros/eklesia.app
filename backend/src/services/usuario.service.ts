import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export const listUsuarios = async () => {
  return prisma.usuario.findMany({
    select: { id: true, nome: true, email: true, perfil: true, congregacaoId: true, ativo: true }
  });
};

export const createUsuario = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  return prisma.usuario.create({
    data: { ...data, senha: hashedPassword }
  });
};

export const updateUsuario = async (id: number, data: any) => {
  return prisma.usuario.update({
    where: { id },
    data
  });
};

export const deleteUsuario = async (id: number) => {
  return prisma.usuario.delete({
    where: { id }
  });
};

export const resetPassword = async (id: number, novaSenha: string) => {
  const hashedPassword = await bcrypt.hash(novaSenha, 10);
  return prisma.usuario.update({
    where: { id },
    data: { senha: hashedPassword }
  });
};

export const changePassword = async (userId: number, senhaAtual: string, novaSenha: string) => {
  const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
  if (!usuario) throw new Error('Usuário não encontrado');
  const valid = await bcrypt.compare(senhaAtual, usuario.senha);
  if (!valid) throw new Error('Senha atual incorreta');
  const hashedPassword = await bcrypt.hash(novaSenha, 10);
  return prisma.usuario.update({
    where: { id: userId },
    data: { senha: hashedPassword }
  });
};

export const getDizimos = async (userId: number) => {
  return prisma.offering.findMany({
    where: { memberId: userId, type: 'dizimo' },
    select: { id: true, value: true, date: true, receiptPhoto: true }
  });
};

export const loginUsuario = async (email: string, senha: string) => {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) return null;
  return usuario;
};

export const uploadComprovante = async (dizimoId: number, imageUrl: string) => {
  return prisma.offering.update({
    where: { id: dizimoId },
    data: { receiptPhoto: imageUrl }
  });
};