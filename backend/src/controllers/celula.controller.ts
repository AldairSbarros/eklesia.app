import { Request, Response } from 'express';
import * as celulaService from '../services/celula.service';
// Criar célula
export const create = async (req: Request, res: Response) => {
  try {
    const celula = await celulaService.createCelula(req.body);
    res.status(201).json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar células
export const list = async (req: Request, res: Response) => {
  try {
    const celulas = await celulaService.listCelulas();
    res.json(celulas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter célula por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const celula = await celulaService.getCelula(Number(id));
    if (!celula) return res.status(404).json({ error: 'Célula não encontrada.' });
    res.json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar célula
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const celula = await celulaService.updateCelula(Number(id), req.body);
    res.json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover célula
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await celulaService.deleteCelula(Number(id));
    res.json({ message: 'Célula removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addMembro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { membroId } = req.body;
  try {
    const membro = await celulaService.addMembroCelula(Number(id), Number(membroId));
    res.status(201).json(membro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMembro = async (req: Request, res: Response) => {
  const { membroId } = req.params;
  try {
    await celulaService.removeMembroCelula(Number(membroId));
    res.json({ message: 'Membro removido da célula.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export function listarMembros(arg0: string, listarMembros: any) {
	throw new Error('Function not implemented.');
}
