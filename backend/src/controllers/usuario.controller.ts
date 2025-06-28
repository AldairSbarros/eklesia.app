import { Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { registrarLog } from '../services/registrarLogs.service';

const prisma = new PrismaClient();

// Listar usuários
export const list = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.listUsuarios();
    res.json(usuarios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Criar usuário
export const create = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, perfil, congregacaoId, token } = req.body;

    // Verificação de token para perfis especiais
    if (perfil === 'admin' && token !== process.env.TOKEN_ADMIN) {
      return res.status(403).json({ error: 'Token de autorização inválido para admin.' });
    }
    if (perfil === 'dirigente' && token !== process.env.TOKEN_PASTOR) {
      return res.status(403).json({ error: 'Token de autorização inválido para dirigente.' });
    }
    if (perfil === 'tesoureiro' && token !== process.env.TOKEN_TESOUREIRO) {
      return res.status(403).json({ error: 'Token de autorização inválido para tesoureiro.' });
    }

    const usuario = await usuarioService.createUsuario({ nome, email, senha, perfil, congregacaoId });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const adminOnly = async (req: Request, res: Response) => {
  res.json({ message: "Acesso permitido apenas para admin.", user: req.user });
};

export const dirigenteOuTesoureiro = async (req: Request, res: Response) => {
  res.json({ message: "Acesso permitido para dirigente ou tesoureiro.", user: req.user });
};

// Atualizar usuário
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, perfil, congregacaoId, ativo } = req.body;
    const usuario = await usuarioService.updateUsuario(Number(id), { nome, email, perfil, congregacaoId, ativo });

    await registrarLog({
      usuarioId: (req as any).user.id,
      acao: 'atualizacao_usuario',
      detalhes: `Atualizou usuário ${id}`,
      ip: req.ip
    });

    res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil, ativo: usuario.ativo });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar usuário
export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await usuarioService.deleteUsuario(Number(id));

    await registrarLog({
      usuarioId: (req as any).user.id,
      acao: 'remocao_usuario',
      detalhes: `Removeu usuário ${id}`,
      ip: req.ip
    });

    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Redefinir senha (admin)
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { novaSenha } = req.body;
    await usuarioService.resetPassword(Number(id), novaSenha);
    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Trocar a própria senha
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const usuarioId = (req as any).user.id;

    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });

    const valid = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!valid) return res.status(401).json({ error: "Senha atual inválida." });

    const hashed = await bcrypt.hash(novaSenha, 10);
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: { senha: hashed }
    });

    res.json({ message: "Senha alterada com sucesso." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar dízimos do usuário logado
export const getDizimos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const dizimos = await usuarioService.getDizimos(userId);
    res.json(dizimos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login de usuário
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
  const usuario = await usuarioService.loginUsuario(email, senha);

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  if (usuario.perfil === 'ADMIN') {
    // Admin sempre pode logar, mesmo se ativo = false
  } else if (usuario.ativo === false) {
    return res.status(403).json({ error: 'Usuário bloqueado.' });
  }

  const dizimos = await usuarioService.getDizimos(usuario.id);
  res.json({ usuario, dizimos });

  await registrarLog({
    usuarioId: usuario.id,
    acao: 'login',
    detalhes: 'Usuário realizou login',
    ip: req.ip
  });
} catch (error: any) {
  res.status(400).json({ error: error.message });
}
};

// Upload de comprovante de dízimo
export const uploadComprovante = async (req: Request, res: Response) => {
  try {
    const { dizimoId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const imageUrl = `URL_DO_ARMAZENAMENTO/${file.filename}`; // Substitua pelo caminho real
    await usuarioService.uploadComprovante(Number(dizimoId), imageUrl);

    res.json({ message: 'Comprovante enviado com sucesso', imageUrl });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};