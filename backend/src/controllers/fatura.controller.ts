import { Request, Response } from 'express';
import * as faturaService from '../services/fatura.service';

// Criar fatura
export const create = async (req: Request, res: Response) => {
  try {
    const fatura = await faturaService.createFatura(req.body);
    res.status(201).json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar faturas
export const list = async (req: Request, res: Response) => {
  try {
    const faturas = await faturaService.listFaturas();
    res.json(faturas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter fatura por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fatura = await faturaService.getFatura(Number(id));
    if (fatura === null) return res.status(404).json({ error: 'Fatura não encontrada.' });
    res.json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar fatura
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fatura = await faturaService.updateFatura(Number(id), req.body);
    res.json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover fatura
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await faturaService.deleteFatura(Number(id));
    res.json({ message: 'Fatura removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};