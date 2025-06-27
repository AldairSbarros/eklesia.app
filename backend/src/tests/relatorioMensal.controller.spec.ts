import request from 'supertest';
import express from 'express';
import * as financeiroService from '../services/financeiro.service';
import { relatorioMensal } from '../controllers/financeiro.controller';
jest.mock('../services/financeiro.service');
const app = express();
app.use(express.json());
app.get('/relatorio-mensal', async (req, res, next) => {
  try {
    await relatorioMensal(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Mock do service
jest.mock('../../services/financeiro.service');

describe('relatorioMensal Controller', () => {
  it('deve retornar relatorio mensal com sucesso', async () => {
    // Arrange: mocka o retorno do service
    (financeiroService.getRelatorioMensal as jest.Mock).mockResolvedValue({
      mes: 6,
      ano: 2025,
      congregacaoId: 1,
      totalDizimos: 1000,
      totalOfertas: 500,
      totalEntradas: 1500,
      comissaoIgreja: 495,
      despesas: [],
      totalDespesas: 0,
      investimentos: [],
      totalInvestimentos: 0,
      despesasMaisInvestimentos: 0,
      despesasDentroLimite: true,
      valorARecolher: 1005
    });

    // Act
    const res = await request(app).get('/relatorio-mensal?congregacaoId=1&mes=6&ano=2025');

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalDizimos', 1000);
    expect(res.body).toHaveProperty('comissaoIgreja', 495);
    expect(res.body).toHaveProperty('valorARecolher', 1005);
  });

  it('deve retornar erro se faltar parâmetros', async () => {
    const res = await request(app).get('/relatorio-mensal?congregacaoId=1&mes=6');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('financeiroService.getResumoFinanceiro', () => {
  it('deve retornar objetos com arrays de dados', async () => {
    // Use um congregacaoId real do seu banco de testes ou mock do Prisma
    const result = await financeiroService.getResumoFinanceiro(1, 6, 2025);
    expect(result).toHaveProperty('offerings');
    expect(result).toHaveProperty('receitas');
    expect(result).toHaveProperty('despesas');
    expect(result).toHaveProperty('investimentos');
    expect(Array.isArray(result.offerings)).toBe(true);
  });
});

describe('financeiroService.getRelatorioMensal', () => {
  it('deve retornar o relatório mensal com totais calculados', async () => {
    // Use um congregacaoId real do seu banco de testes ou mock do Prisma
    const result = await financeiroService.getRelatorioMensal(1, 6, 2025);
    expect(result).toHaveProperty('totalDizimos');
    expect(result).toHaveProperty('totalOfertas');
    expect(result).toHaveProperty('comissaoIgreja');
    expect(result).toHaveProperty('valorARecolher');
    expect(result).toHaveProperty('despesasDentroLimite');
  });
});