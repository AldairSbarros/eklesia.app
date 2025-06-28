import { createUsuario } from '../services/usuario.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Usuario Service', () => {
  afterAll(async () => {
    await prisma.usuario.deleteMany({ where: { email: 'teste@teste.com' } });
    await prisma.$disconnect();
  });

  it('deve criar um usuário', async () => {
    const usuario = await createUsuario({
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: '123456',
      perfil: 'ADMIN' // use o valor correto do seu enum
    });
    expect(usuario).toHaveProperty('id');
    expect(usuario.email).toBe('teste@teste.com');
  });
});