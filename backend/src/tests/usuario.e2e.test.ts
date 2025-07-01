import request from 'supertest';
import app from '../app'; // ajuste o caminho para seu app Express

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Usuários (multi-tenant)', () => {
  let token: string;

  it('deve fazer login e retornar token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('schema', SCHEMA)
      .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .set('schema', SCHEMA)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Novo Usuário',
        email: 'novo@teste.com',
        senha: 'Senha@123',
        perfil: 'admin'
      });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('novo@teste.com');
  });

  // Adicione outros testes para GET, PUT, DELETE etc., sempre usando .set('schema', SCHEMA)
});