import { Request, Response } from 'express';
// Update the import path if the service file is located elsewhere, for example:
import * as licaoService from '../services/escolaLideresLicao.service';
// If the file does not exist, create 'src/services/licaoService.ts' with the following content:

// Example licaoService implementation (create this file if missing)
export default {
  async createLicao(data: any) { /* ... */ },
  async listLicoes() { /* ... */ },
  async getLicao(id: number) { /* ... */ },
  async updateLicao(id: number, data: any) { /* ... */ },
  async deleteLicao(id: number) { /* ... */ }
};

// Criar lição
export const create = async (req: Request, res: Response) => {
  try {
    const licao = await licaoService.createLicao(req.body);
    res.status(201).json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar lições
export const list = async (req: Request, res: Response) => {
  try {
    const licoes = await licaoService.listLicoes();
    res.json(licoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter lição por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licao = await licaoService.getLicao(Number(id));
    if (!licao) return res.status(404).json({ error: 'Lição não encontrada.' });
    res.json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar lição
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licao = await licaoService.updateLicao(Number(id), req.body);
    res.json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover lição
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await licaoService.deleteLicao(Number(id));
    res.json({ message: 'Lição removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};