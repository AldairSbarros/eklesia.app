import { Request, Response } from 'express';
import * as enderecoIgrejaService from '../services/enderecoIgreja.service';

// Criar endereço de igreja
export const create = async (req: Request, res: Response) => {
  try {
    const endereco = await enderecoIgrejaService.createEnderecoIgreja(req.body);
    res.status(201).json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar endereços de igreja
export const list = async (req: Request, res: Response) => {
  try {
    const enderecos = await enderecoIgrejaService.listEnderecosIgreja();
    res.json(enderecos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter endereço de igreja por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoIgrejaService.getEnderecoIgreja(Number(id));
    if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar endereço de igreja
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoIgrejaService.updateEnderecoIgreja(Number(id), req.body);
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover endereço de igreja
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await enderecoIgrejaService.deleteEnderecoIgreja(Number(id));
    res.json({ message: 'Endereço removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};