import request from 'supertest';
import app from '../app';
 // ajuste o caminho conforme seu projeto

describe('Usuário - Rotas', () => {
  it('deve cadastrar um usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
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