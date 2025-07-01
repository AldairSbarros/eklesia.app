import request from 'supertest';
import app from '../app';

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Usuário Controller (multi-tenant)', () => {
  it('deve cadastrar um usuário via API', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .set('schema', SCHEMA)
      .send({ 
        nome: 'Teste', 
        email: 'teste@teste.com', 
        senha: '123456', 
        perfil: 'ADMIN' // inclua se for obrigatório no controller
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});