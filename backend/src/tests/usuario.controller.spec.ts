import request from 'supertest';
import app from '../app'; // ajuste o caminho conforme seu projeto

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Usuário - Rotas (multi-tenant)', () => {
  it('deve cadastrar um usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .set('schema', SCHEMA)
      .send({
        nome: 'Usuário Integração',
        email: `int${Date.now()}@teste.com`,
        senha: '123456',
        perfil: 'ADMIN',
        token: process.env.TOKEN_ADMIN
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('não deve cadastrar usuário com e-mail inválido', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .set('schema', SCHEMA)
      .send({
        nome: 'Usuário Inválido',
        email: 'emailinvalido',
        senha: '123456',
        perfil: 'ADMIN',
        token: process.env.TOKEN_ADMIN
      });
    expect(res.status).toBe(400);
  });
});