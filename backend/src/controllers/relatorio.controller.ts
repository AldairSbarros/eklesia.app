import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import * as relatorioService from '../services/relatorio.service';

// Relatório mensal em JSON
export const relatorioMensal = async (req: Request, res: Response) => {
  try {
    const { mes, ano } = req.query;
    let { congregacaoId } = req.query as { congregacaoId?: string };

    if ((req as any).user?.perfil !== 'pastor' && (req as any).user?.perfil !== 'admin') {
      congregacaoId = (req as any).user?.congregacaoId;
    }

    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Informe congregacaoId, mes e ano' });
      return;
    }

    const data = await relatorioService.getRelatorioMensalData(
      String(congregacaoId),
      String(mes),
      String(ano)
    );

    res.json({
      dizimistas: data.listaDizimistas,
      ofertasDetalhadas: data.ofertas,
      ofertasPorCulto: data.ofertasPorCulto,
      somaOfertasPorCulto: data.somaPorCulto,
      totalDizimos: data.totalDizimos,
      totalOfertas: data.totalOfertas,
      totalArrecadado: data.totalArrecadado,
      comissao33: data.comissao,
      paraCentral67: data.paraCentral
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Relatório mensal em PDF
export const relatorioMensalPDF = async (req: Request, res: Response) => {
  try {
    const { mes, ano } = req.query;
    let { congregacaoId } = req.query as { congregacaoId?: string };

    if ((req as any).user?.perfil !== 'pastor' && (req as any).user?.perfil !== 'admin') {
      congregacaoId = (req as any).user?.congregacaoId;
    }

    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Informe congregacaoId, mes e ano' });
      return;
    }

    const data = await relatorioService.getRelatorioMensalData(
      String(congregacaoId),
      String(mes),
      String(ano)
    );

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    doc.pipe(res);

    doc.fontSize(18).text('Relatório Mensal de Tesouraria', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Mês: ${mes}/${ano}`);
    doc.text(`Congregação: ${congregacaoId}`);
    doc.moveDown();

    doc.fontSize(12).text('Dizimistas:');
    data.listaDizimistas.forEach(d => {
      doc.text(`- ${d.nome}: R$ ${d.valor.toFixed(2)}`);
    });
    doc.moveDown();

    doc.text('Ofertas por Culto:');
    Object.keys(data.somaPorCulto).forEach(culto => {
      doc.text(`- ${culto}: R$ ${data.somaPorCulto[culto].toFixed(2)}`);
    });
    doc.moveDown();

    doc.text(`Total de Dízimos: R$ ${data.totalDizimos.toFixed(2)}`);
    doc.text(`Total de Ofertas: R$ ${data.totalOfertas.toFixed(2)}`);
    doc.text(`Total Arrecadado: R$ ${data.totalArrecadado.toFixed(2)}`);
    doc.text(`Comissão 33%: R$ ${data.comissao.toFixed(2)}`);
    doc.text(`Para Central 67%: R$ ${data.paraCentral.toFixed(2)}`);

    doc.end();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};