import { Request, Response } from 'express';
import * as visitanteService from '../services/visitante.service';

// Criar visitante
export const create = async (req: Request, res: Response) => {
  try {
    const visitante = await visitanteService.createVisitante(req.body);
    res.status(201).json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar visitantes
export const list = async (req: Request, res: Response) => {
  try {
    const visitantes = await visitanteService.listVisitantes();
    res.json(visitantes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter visitante por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const visitante = await visitanteService.getVisitante(Number(id));
    if (!visitante) return res.status(404).json({ error: 'Visitante não encontrado.' });
    res.json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar visitante
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const visitante = await visitanteService.updateVisitante(Number(id), req.body);
    res.json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover visitante
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await visitanteService.deleteVisitante(Number(id));
    res.json({ message: 'Visitante removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};