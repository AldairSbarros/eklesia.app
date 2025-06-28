import express, { Request, Response } from 'express';
import { gerarExcel, gerarPDF } from '../services/exportacao.service';
import { getRelatorioMensalData } from '../services/relatorio.service';

const router = express.Router();

router.get('/exportar/excel', async (req: Request, res: Response) => {
  try {
    const { congregacaoId, mes, ano } = req.query;
    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Parâmetros congregacaoId, mes e ano são obrigatórios.' });
      return;
    }
    const dados = await getRelatorioMensalData(
      String(congregacaoId),
      String(mes),
      String(ano)
    );
    const buffer = await gerarExcel(dados.listaDizimistas, 'Dizimistas');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.get('/exportar/pdf', async (req: Request, res: Response) => {
  try {
    const { congregacaoId, mes, ano } = req.query;
    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Parâmetros congregacaoId, mes e ano são obrigatórios.' });
      return;
    }
    const dados = await getRelatorioMensalData(
      String(congregacaoId),
      String(mes),
      String(ano)
    );
    const buffer = gerarPDF(dados.listaDizimistas, 'Dizimistas');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

export default router;