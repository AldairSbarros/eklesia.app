import * as churchService from "../services/church.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

afterAll(async () => {
  // Fecha a conexão do Prisma após todos os testes
  await prisma.$disconnect();
});

const SCHEMA = 'cliente_teste'; // Defina o schema de teste, se necessário

describe("Integração: criação de banco e migrations (multi-tenant)", () => {
  it("deve criar uma igreja e rodar migrations sem erro", async () => {
    const data = {
      nome: "Igreja Integração",
      email: `igreja${Date.now()}@teste.com`,
      password: "123456"
    };
    // Se sua função createChurch espera o schema como primeiro argumento, use:
    // const igreja = await churchService.createChurch(SCHEMA, data);
    // Caso contrário, apenas passe os dados normalmente:
    const igreja = await churchService.createChurch(data);
    expect(igreja).toHaveProperty("id");
    expect(igreja).toHaveProperty("schema");
    expect(igreja.nome).toBe(data.nome);
  }, 20000); // aumenta o timeout para 20 segundos
});