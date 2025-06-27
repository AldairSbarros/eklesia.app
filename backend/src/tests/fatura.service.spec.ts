import { createFatura, listFaturas, __resetFaturas } from "../../src/services/fatura.service";

describe('Fatura Service', () => {
  beforeEach(() => {
    __resetFaturas();
  });

  it('deve criar uma fatura', async () => {
    const data = { valor: 100, descricao: "Teste" };
    const fatura = await createFatura(data);
    expect(fatura).toHaveProperty("id");
    expect(fatura.valor).toBe(100);
    expect(fatura.descricao).toBe("Teste");
  });

  it('deve listar faturas', async () => {
    await createFatura({ valor: 50, descricao: "Fatura 1" });
    const faturas = await listFaturas();
    expect(faturas.length).toBeGreaterThan(0);
  });
});