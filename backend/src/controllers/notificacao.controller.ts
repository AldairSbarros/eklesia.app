import { Request, Response } from 'express';
import * as notificacaoService from '../services/notificacao.service';

// Criar notificação
export const create = async (req: Request, res: Response) => {
  try {
    const notificacao = await notificacaoService.createNotificacao(req.body);
    res.status(201).json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar notificações
export const list = async (req: Request, res: Response) => {
  try {
    const notificacoes = await notificacaoService.listNotificacoes();
    res.json(notificacoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter notificação por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notificacao = await notificacaoService.getNotificacao(Number(id));
    if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada.' });
    res.json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar notificação
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notificacao = await notificacaoService.updateNotificacao(Number(id), req.body);
    res.json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover notificação
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await notificacaoService.deleteNotificacao(Number(id));
    res.json({ message: 'Notificação removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default notificacaoService; 