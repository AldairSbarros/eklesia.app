import { Request, Response } from 'express';
import * as pastorService from '../services/pastor.service';

// Criar pastor
export const create = async (req: Request, res: Response) => {
  try {
    const pastor = await pastorService.createPastor(req.body);
    res.status(201).json(pastor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar pastores
export const list = async (req: Request, res: Response) => {
  try {
    const pastores = await pastorService.listPastores();
    res.json(pastores);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter pastor por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pastor = await pastorService.getPastor(Number(id));
    if (!pastor) return res.status(404).json({ error: 'Pastor não encontrado.' });
    res.json(pastor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar pastor
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pastor = await pastorService.updatePastor(Number(id), req.body);
    res.json(pastor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover pastor
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pastorService.deletePastor(Number(id));
    res.json({ message: 'Pastor removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};