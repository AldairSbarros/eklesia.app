import request from 'supertest';
import app from '../app';

describe('Usuário Controller', () => {
  it('deve cadastrar um usuário via API', async () => {
    const res = await request(app)
      .post('/api/usuarios')
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