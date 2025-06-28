import request from "supertest";
import app from "../app"; // ajuste o caminho conforme seu projeto

describe("Auth Controller", () => {
  it("deve cadastrar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        nome: "Usuário Teste",
        email: `teste${Date.now()}@teste.com`,
        senha: "123456",
        perfil: "ADMIN"
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("deve autenticar e retornar um token", async () => {
    // Primeiro, cadastre um usuário
    const email = `login${Date.now()}@teste.com`;
    await request(app)
      .post("/api/auth/register")
      .send({
        nome: "Login Teste",
        email,
        senha: "123456",
        perfil: "ADMIN"
      });

    // Agora, faça login
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, senha: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});