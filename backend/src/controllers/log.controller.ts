import { Request, Response } from 'express';
import * as logService from '../services/log.service';

// Criar log
export const create = async (req: Request, res: Response) => {
  try {
    const log = await logService.createLog(req.body);
    res.status(201).json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar logs
export const list = async (req: Request, res: Response) => {
  try {
    const logs = await logService.listLogs();
    res.json(logs);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter log por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await logService.getLog(Number(id));
    if (!log) return res.status(404).json({ error: 'Log não encontrado.' });
    res.json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar log
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await logService.updateLog(Number(id), req.body);
    res.json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover log
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await logService.deleteLog(Number(id));
    res.json({ message: 'Log removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};