import { Request, Response } from 'express';
import * as tokenService from '../services/tokenRecuperacaoSenha.service';

// Criar token de recuperação de senha
export const create = async (req: Request, res: Response) => {
  try {
    const token = await tokenService.createToken(req.body);
    res.status(201).json(token);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar tokens
export const list = async (req: Request, res: Response) => {
  try {
    const tokens = await tokenService.listTokens();
    res.json(tokens);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter token por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await tokenService.getToken(Number(id));
    if (!token) return res.status(404).json({ error: 'Token não encontrado.' });
    res.json(token);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar token
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await tokenService.updateToken(Number(id), req.body);
    res.json(token);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover token
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await tokenService.deleteToken(Number(id));
    res.json({ message: 'Token removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};