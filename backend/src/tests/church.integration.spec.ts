import * as churchService from "../services/church.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

afterAll(async () => {
  // Fecha a conexão do Prisma após todos os testes
  await prisma.$disconnect();
});

describe("Integração: criação de banco e migrations", () => {
  it("deve criar uma igreja e rodar migrations sem erro", async () => {
    const data = {
      nome: "Igreja Integração",
      email: `igreja${Date.now()}@teste.com`,
      password: "123456"
    };
    const igreja = await churchService.createChurch(data);
    expect(igreja).toHaveProperty("id");
    expect(igreja).toHaveProperty("schema");
    expect(igreja.nome).toBe(data.nome);
  }, 20000); // aumenta o timeout para 20 segundos
});