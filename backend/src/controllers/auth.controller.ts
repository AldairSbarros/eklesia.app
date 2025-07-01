import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "seuSegredoSuperSecreto";

// Cadastro
export const register = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { nome, email, senha, perfil, congregacaoId } = req.body;
    if (!nome || !email || !senha || !perfil) {
      res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
      return;
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const usuario = await authService.createUsuario(schema, {
      nome,
      email,
      senha: hashedPassword,
      perfil,
      congregacaoId
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      congregacaoId: usuario.congregacaoId
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { email, senha } = req.body;
    const usuario = await authService.findUsuarioByEmail(schema, email);
    if (!usuario) {
      res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      return;
    }

    const valid = await bcrypt.compare(senha, usuario.senha);
    if (!valid) {
      res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      return;
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil, congregacaoId: usuario.congregacaoId },
      secret,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        congregacaoId: usuario.congregacaoId
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};