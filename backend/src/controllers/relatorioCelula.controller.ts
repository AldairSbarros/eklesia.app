import * as relatorioService from '../services/relatorioCelula.service';
import { Request, Response, NextFunction } from 'express';

export const relatorioCompleto = async (req: Request, res: Response, next: NextFunction) => {
  const { celulaId } = req.params;
  let { mes, ano } = req.query;

  // Valores padrão: mês e ano atuais
  const now = new Date();
  const mesNum = mes ? Number(mes) : now.getMonth() + 1;
  const anoNum = ano ? Number(ano) : now.getFullYear();

  try {
    const membros = await relatorioService.membrosDaCelula(Number(celulaId));
    const presencas = await relatorioService.presencasPorReuniao(Number(celulaId));
    const media = await relatorioService.mediaPresencaNoMes(Number(celulaId), mesNum, anoNum);
    const ranking = await relatorioService.rankingPresenca(Number(celulaId), mesNum, anoNum);
    const aniversariantes = await relatorioService.aniversariantesDoMes(Number(celulaId), mesNum);
    res.json({ membros, presencas, media, ranking, aniversariantes });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const relatorioPresenca = async (req: Request, res: Response, next: NextFunction) => {
  const { celulaId } = req.params;
  try {
    const presencas = await relatorioService.presencasPorReuniao(Number(celulaId));
    res.json(presencas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};