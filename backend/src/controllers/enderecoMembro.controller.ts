import { Request, Response } from 'express';
import * as enderecoService from '../services/enderecoMembro.service';

// Criar endereço
export const create = async (req: Request, res: Response) => {
  try {
    const endereco = await enderecoService.createEndereco(req.body);
    res.status(201).json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar endereços
export const list = async (req: Request, res: Response) => {
  try {
    const enderecos = await enderecoService.listEnderecos();
    res.json(enderecos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter endereço por ID
export const get = async (req: Request, res: Response, next: unknown) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoService.getEndereco(Number(id));
    if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar endereço
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoService.updateEndereco(Number(id), req.body);
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover endereço
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await enderecoService.deleteEndereco(Number(id));
    res.json({ message: 'Endereço removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

