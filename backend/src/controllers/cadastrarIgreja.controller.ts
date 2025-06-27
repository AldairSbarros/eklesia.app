import { Request, Response } from 'express';
// Update the import path if the file is in a different location, for example:
import * as churchService from '../services/church.service';
// If the file does not exist, create 'src/services/church.service.ts' with the required exports.

// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const igreja = await churchService.createChurch(req.body);
    res.status(201).json(igreja);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ (listar todas)
export const list = async (req: Request, res: Response) => {
  try {
    const igrejas = await churchService.listChurches();
    res.json(igrejas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response) => {
  try {
    const igreja = await churchService.updateChurch(Number(req.params.id), req.body);
    res.json(igreja);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response) => {
  try {
    await churchService.deleteChurch(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};