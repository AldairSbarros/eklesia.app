import { Request, Response } from 'express';
import * as presencaService from '../services/presencaCelula.service';

// Criar presença
export const create = async (req: Request, res: Response) => {
  try {
    const presenca = await presencaService.createPresenca(req.body);
    res.status(201).json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar presenças
export const list = async (req: Request, res: Response) => {
  try {
    const presencas = await presencaService.listPresencas();
    res.json(presencas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter presença por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const presenca = await presencaService.getPresenca(Number(id));
    if (!presenca) return res.status(404).json({ error: 'Presença não encontrada.' });
    res.json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar presença
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const presenca = await presencaService.updatePresenca(Number(id), req.body);
    res.json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover presença
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await presencaService.deletePresenca(Number(id));
    res.json({ message: 'Presença removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};