import { Request, Response } from 'express';
import * as ministerioService from '../services/ministerio.service';

// Criar ministério
export const create = async (req: Request, res: Response) => {
  try {
    const ministerio = await ministerioService.createMinisterio(req.body);
    res.status(201).json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar ministérios
export const list = async (req: Request, res: Response) => {
  try {
    const ministerios = await ministerioService.listMinisterios();
    res.json(ministerios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter ministério por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ministerio = await ministerioService.getMinisterio(Number(id));
    if (!ministerio) return res.status(404).json({ error: 'Ministério não encontrado.' });
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar ministério
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ministerio = await ministerioService.updateMinisterio(Number(id), req.body);
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover ministério
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ministerioService.deleteMinisterio(Number(id));
    res.json({ message: 'Ministério removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};