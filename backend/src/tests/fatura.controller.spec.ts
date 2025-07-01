import request from 'supertest';
import app from '../../src/app';

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Fatura Controller (multi-tenant)', () => {
  it('deve criar uma fatura via POST /api/faturas', async () => {
    const response = await request(app)
      .post('/api/faturas')
      .set('schema', SCHEMA)
      .send({ valor: 100, descricao: 'Teste', status: 'PENDENTE', Venda: null }); // ajuste os campos conforme seu model
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});