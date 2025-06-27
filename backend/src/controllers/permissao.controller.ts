import { Request, Response } from 'express';
import * as permissaoService from '../services/permissao.service';

// Criar permissão
export const create = async (req: Request, res: Response) => {
  try {
    const permissao = await permissaoService.createPermissao(req.body);
    res.status(201).json(permissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar permissões
export const list = async (req: Request, res: Response) => {
  try {
    const permissoes = await permissaoService.listPermissoes();
    res.json(permissoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter permissão por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permissao = await permissaoService.getPermissao(Number(id));
    if (!permissao) return res.status(404).json({ error: 'Permissão não encontrada.' });
    res.json(permissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar permissão
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permissao = await permissaoService.updatePermissao(Number(id), req.body);
    res.json(permissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover permissão
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await permissaoService.deletePermissao(Number(id));
    res.json({ message: 'Permissão removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};