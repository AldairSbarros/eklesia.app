import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Use se as senhas estiverem criptografadas
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

export const loginMembro = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  const membro = await prisma.member.findFirst({ where: { email } });

  if (!membro) {
    res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    return;
  }

  // Se as senhas estiverem criptografadas, use bcrypt.compare
  // Caso contrário, compare direto (NÃO recomendado para produção)
  const senhaCorreta = membro.senha && membro.senha.startsWith('$2a')
    ? await bcrypt.compare(senha, membro.senha)
    : senha === membro.senha;

  if (!senhaCorreta) {
    res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    return;
  }

  // Gere o token JWT
  const token = jwt.sign(
    { id: membro.id, nome: membro.nome, email: membro.email, tipo: 'membro' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    membro: {
      id: membro.id,
      nome: membro.nome,
      email: membro.email,
      congregacaoId: membro.congregacaoId,
    }
  });
}