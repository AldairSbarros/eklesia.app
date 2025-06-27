import { Request, Response } from 'express';
import * as moduloService from '../services/escolaLideresModulo.service';

// Criar módulo
export const create = async (req: Request, res: Response) => {
  try {
    const modulo = await moduloService.createModulo(req.body);
    res.status(201).json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar módulos
export const list = async (req: Request, res: Response) => {
  try {
    const modulos = await moduloService.listModulos();
    res.json(modulos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter módulo por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const modulo = await moduloService.getModulo(Number(id));
    if (!modulo) return res.status(404).json({ error: 'Módulo não encontrado.' });
    res.json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar módulo
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const modulo = await moduloService.updateModulo(Number(id), req.body);
    res.json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover módulo
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await moduloService.deleteModulo(Number(id));
    res.json({ message: 'Módulo removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};