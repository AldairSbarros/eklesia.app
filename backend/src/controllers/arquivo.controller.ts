import { Request, Response } from 'express';
import * as arquivoService from '../services/arquivo.service';

// Criar arquivo
export const create = async (req: Request, res: Response) => {
  try {
    const arquivo = await arquivoService.createArquivo(req.body);
    res.status(201).json(arquivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar arquivos
export const list = async (req: Request, res: Response) => {
  try {
    const arquivos = await arquivoService.listArquivos();
    res.json(arquivos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter arquivo por ID
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const arquivo = await arquivoService.getArquivo(Number(id));
    if (!arquivo) return res.status(404).json({ error: 'Arquivo não encontrado.' });
    res.json(arquivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar arquivo
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const arquivo = await arquivoService.updateArquivo(Number(id), req.body);
    res.json(arquivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover arquivo
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await arquivoService.deleteArquivo(Number(id));
    res.json({ message: 'Arquivo removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};