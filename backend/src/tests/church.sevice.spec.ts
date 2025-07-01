import * as churchService from "../services/church.service";

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe("Church Service (multi-tenant)", () => {
  it("deve lançar erro se nome não for informado", async () => {
    await expect(churchService.createChurch({ email: "teste@teste.com" }))
      .rejects
      .toThrow("Nome é obrigatório.");
  });

  it("deve lançar erro se e-mail não for informado", async () => {
    await expect(churchService.createChurch({ nome: "Igreja Teste" }))
      .rejects
      .toThrow("E-mail é obrigatório.");
  });

  it("deve lançar erro ao tentar atualizar igreja sem nome", async () => {
    await expect(churchService.updateChurch(1, { email: "novo@teste.com" }))
      .rejects
      .toThrow("Nome é obrigatório.");
  });

  it("deve lançar erro ao tentar atualizar igreja sem e-mail", async () => {
    await expect(churchService.updateChurch(1, { nome: "Nova Igreja" }))
      .rejects
      .toThrow("E-mail é obrigatório.");
  });

  it("deve lançar erro ao tentar remover igreja inexistente", async () => {
    await expect(churchService.deleteChurch(99999))
      .rejects
      .toThrow();
  });
});