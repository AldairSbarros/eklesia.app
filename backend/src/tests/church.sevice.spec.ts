

import * as  churchService  from "../services/church.service";

describe("Church Service", () => {
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

  // Adicione outros testes para update, delete, etc.
});



describe("Church Service", () => {
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
    // Aqui você pode simular um ID que não existe, dependendo do seu mock ou banco de teste
    await expect(churchService.deleteChurch(99999))
      .rejects
      .toThrow();
  });
});