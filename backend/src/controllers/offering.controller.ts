import { Request, Response } from 'express';
import * as offeringService from '../services/offering.service';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// CREATE
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { congregacaoNome, memberNome, type, value, date, service, receiptPhoto, numeroRecibo } = req.body;

    const congregacao = await prisma.congregacao.findFirst({ where: { nome: congregacaoNome } });
    if (!congregacao) {
      res.status(404).json({ error: 'Congregação não encontrada.' });
      return;
    }

    const member = await prisma.member.findFirst({
      where: { nome: memberNome, congregacaoId: congregacao.id }
    });
    if (!member) {
      res.status(404).json({ error: 'Membro não encontrado nesta congregação.' });
      return;
    }

    const offering = await offeringService.createOffering({
      memberId: member.id,
      congregacaoId: congregacao.id,
      type,
      value,
      date: new Date(date),
      service,
      receiptPhoto,
      numeroRecibo
    });
    res.status(201).json(offering);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const { congregacaoId, memberId, type, mes, ano } = req.query;
    const where: any = {};
    if (congregacaoId) where.congregacaoId = Number(congregacaoId);
    if (memberId) where.memberId = Number(memberId);
    if (type) where.type = String(type);

    if (mes && ano) {
      const inicio = new Date(Number(ano), Number(mes) - 1, 1);
      const fim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
      where.date = { gte: inicio, lte: fim };
    }

    const offerings = await offeringService.listOfferings(where);
    res.json(offerings);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ONE
export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const offering = await offeringService.getOffering(Number(id));
    if (!offering) {
      res.status(404).json({ error: 'Registro não encontrado.' });
      return;
    }
    res.json(offering);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const offering = await offeringService.updateOffering(Number(id), data);
    res.json(offering);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await offeringService.removeOffering(Number(id));
    res.json({ message: 'Registro removido com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE RECEIPT PHOTO
export const updateReceiptPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { receiptPhoto } = req.body;
    const offering = await offeringService.updateOffering(Number(id), { receiptPhoto });
    res.json(offering);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE RECEIPT PHOTO
export const deleteReceiptPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const offering = await offeringService.getOffering(Number(id));
    if (!offering || !offering.receiptPhoto) {
      res.status(404).json({ error: 'Comprovante não encontrado' });
      return;
    }

    const filePath = path.resolve(__dirname, '../../', offering.receiptPhoto);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await offeringService.updateOffering(Number(id), { receiptPhoto: null });
    res.json({ message: 'Comprovante removido com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// LIST RECEIPTS
export const listReceipts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { congregacaoId, mes, ano } = req.query;
    if (!congregacaoId) {
      res.status(400).json({ error: 'Informe o congregacaoId' });
      return;
    }

    const where: any = {
      congregacaoId: Number(congregacaoId),
      receiptPhoto: { not: null }
    };

    if (mes && ano) {
      const inicio = new Date(Number(ano), Number(mes) - 1, 1);
      const fim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
      where.date = { gte: inicio, lte: fim };
    }

    const comprovantes = await offeringService.listReceipts(where);
    res.json(comprovantes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};