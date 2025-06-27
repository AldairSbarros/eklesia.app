import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { exec } from 'child_process';

const prisma = new PrismaClient();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

interface NovaIgrejaDTO {
  nome: string;
  email: string;
  password: string;
  logo?: string;
  enderecoId?: number;
  pastorPrincipalId?: number;
}

export async function cadastrarIgrejaService(data: NovaIgrejaDTO) {
  // Gera hash da senha
  const hashed = await bcrypt.hash(data.password, 10);

  // Gera nome único para o schema
  const schema = `church_${data.nome.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`;

  // Cria registro da igreja no banco global
  const igreja = await prisma.church.create({
    data: {
      nome: data.nome,
      email: data.email,
      password: hashed,
      logo: data.logo,
      enderecoId: data.enderecoId,
      pastorPrincipalId: data.pastorPrincipalId,
      schema,
    },
  });

  // Cria o schema no banco de dados
  await pool.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);

  // (Opcional) Rode as migrations para o novo schema
  exec(
    `npx prisma migrate deploy --schema=prisma/schema.prisma --schema=${schema}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao rodar migrations no novo schema: ${error.message}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      if (stdout) {
        console.log(`stdout: ${stdout}`);
      }
    }
  );

  return igreja;
}