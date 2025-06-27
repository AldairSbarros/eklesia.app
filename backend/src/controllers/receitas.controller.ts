import { Request, Response } from 'express';
// Update the import path if the file is named differently or in another folder
import * as receitasService from '../services/receita.service';
import manualCodigos from '../utils/manualCodigos.json';

// CREATE
export const criarReceita = async (req: Request, res: Response) => {
  try {
    let { congregacaoId, descricao, valor, data, categoria, codigoManual } = req.body;

    if (codigoManual && !descricao) {
      const found = manualCodigos.receitas.find(r => r.codigo === codigoManual);
      if (found) descricao = found.descricao;
    }
    if (descricao && !codigoManual) {
      const found = manualCodigos.receitas.find(r => r.descricao.toLowerCase() === descricao.toLowerCase());
      if (found) codigoManual = found.codigo;
    }
    if (!codigoManual || !descricao) {
      return res.status(400).json({ error: 'Código ou descrição de receita inválidos.' });
    }

    const receita = await receitasService.criarReceita({
      congregacaoId: Number(congregacaoId),
      descricao,
      valor: Number(valor),
      data: new Date(data),
      categoria,
      codigoManual
    });

    res.status(201).json(receita);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const listarReceitas = async (req: Request, res: Response) => {
  try {
    const receitas = await receitasService.listarReceitas();
    res.json(receitas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ONE
export const obterReceita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receita = await receitasService.obterReceita(Number(id));
    if (!receita) return res.status(404).json({ error: 'Receita não encontrada.' });
    res.json(receita);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const atualizarReceita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receita = await receitasService.atualizarReceita(Number(id), req.body);
    res.json(receita);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const removerReceita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await receitasService.removerReceita(Number(id));
    res.json({ message: 'Receita removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};