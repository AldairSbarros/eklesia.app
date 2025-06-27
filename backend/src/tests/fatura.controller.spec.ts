import request from 'supertest';
import app from '../../src/app';

describe('Fatura Controller', () => {
  it('deve criar uma fatura via POST /api/faturas', async () => {
    const response = await request(app)
      .post('/api/faturas')
      .send({ valor: 100, descricao: 'Teste' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});