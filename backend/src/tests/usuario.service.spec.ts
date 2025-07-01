import { criarUsuario } from '../services/usuario.service';
import { getPrisma } from '../utils/prismaDynamic';

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Usuario Service (multi-tenant)', () => {
  const prisma = getPrisma(SCHEMA);

  afterAll(async () => {
    await prisma.usuario.deleteMany({ where: { email: 'teste@teste.com' } });
    await prisma.$disconnect();
  });

  it('deve criar um usuário', async () => {
    const usuario = await criarUsuario(SCHEMA, {
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: '123456',
      perfil: 'ADMIN', // ou outro valor válido do seu enum/modelo
    });
    expect(usuario).toHaveProperty('id');
    expect(usuario.email).toBe('teste@teste.com');
  });
});