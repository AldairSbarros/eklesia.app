import { Request, Response } from 'express';
import * as ministerioLocalService from '../services/ministerioLocal.service';

// Criar ministério local
export const create = async (req: Request, res: Response) => {
  try {
    const ministerio = await ministerioLocalService.createMinisterioLocal(req.body);
    res.status(201).json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar ministérios locais
export const list = async (req: Request, res: Response) => {
  try {
    const ministerios = await ministerioLocalService.listMinisteriosLocais();
    res.json(ministerios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter ministério local por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ministerio = await ministerioLocalService.getMinisterioLocal(Number(id));
    if (!ministerio) return res.status(404).json({ error: 'Ministério local não encontrado.' });
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar ministério local
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ministerio = await ministerioLocalService.updateMinisterioLocal(Number(id), req.body);
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover ministério local
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ministerioLocalService.deleteMinisterioLocal(Number(id));
    res.json({ message: 'Ministério local removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};