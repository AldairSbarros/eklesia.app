import { createFatura, listFaturas } from "../../src/services/fatura.service";

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe('Fatura Service (multi-tenant)', () => {
  // Se precisar limpar as faturas antes de cada teste, faça aqui usando Prisma ou o método adequado

  it('deve criar uma fatura', async () => {
    const data = { valor: 100, descricao: "Teste", status: "PENDENTE", Venda: null }; // ajuste os campos conforme seu model
    const fatura = await createFatura(SCHEMA, data);
    expect(fatura).toHaveProperty("id");
    expect(fatura.valor).toBe(100);
    expect(fatura.observacao).toBe("Teste");
  });

  it('deve listar faturas', async () => {
    await createFatura(SCHEMA, { valor: 50, descricao: "Fatura 1", status: "PENDENTE", Venda: null }); // ajuste os campos conforme seu model
    const faturas = await listFaturas(SCHEMA);
    expect(faturas.length).toBeGreaterThan(0);
  });
});