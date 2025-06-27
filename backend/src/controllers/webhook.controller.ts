import { Request, Response } from 'express';
import * as webhookService from '../services/webhook.service';

// Criar webhook
export const create = async (req: Request, res: Response) => {
  try {
    const webhook = await webhookService.createWebhook(req.body);
    res.status(201).json(webhook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar webhooks
export const list = async (req: Request, res: Response) => {
  try {
    const webhooks = await webhookService.listWebhooks();
    res.json(webhooks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter webhook por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const webhook = await webhookService.getWebhook(Number(id));
    if (!webhook) return res.status(404).json({ error: 'Webhook não encontrado.' });
    res.json(webhook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar webhook
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const webhook = await webhookService.updateWebhook(Number(id), req.body);
    res.json(webhook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover webhook
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await webhookService.deleteWebhook(Number(id));
    res.json({ message: 'Webhook removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};