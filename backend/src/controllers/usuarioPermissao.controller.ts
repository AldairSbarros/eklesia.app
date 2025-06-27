import { Request, Response } from 'express';
import * as usuarioPermissaoService from '../services/usuarioPermissao.service';


// Criar usuário-permissão
export const create = async (req: Request, res: Response) => {
  try {
    const usuarioPermissao = await usuarioPermissaoService.createUsuarioPermissao(req.body);
    res.status(201).json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar usuário-permissão
export const list = async (req: Request, res: Response) => {
  try {
    const usuarioPermissoes = await usuarioPermissaoService.listUsuarioPermissoes();
    res.json(usuarioPermissoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter usuário-permissão por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioPermissao = await usuarioPermissaoService.getUsuarioPermissao(Number(id));
    if (!usuarioPermissao) return res.status(404).json({ error: 'Usuário-permissão não encontrado.' });
    res.json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar usuário-permissão
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioPermissao = await usuarioPermissaoService.updateUsuarioPermissao(Number(id), req.body);
    res.json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover usuário-permissão
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await usuarioPermissaoService.deleteUsuarioPermissao(Number(id));
    res.json({ message: 'Usuário-permissão removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// No default export needed; all exports are named above.
export default usuarioPermissaoService