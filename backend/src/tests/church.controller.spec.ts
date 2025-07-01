import request from "supertest";
import app from "../app";

const SCHEMA = 'cliente_teste'; // Defina o schema de teste

describe("Church Controller (multi-tenant)", () => {
  it("deve retornar erro 400 se nome não for informado", async () => {
    const res = await request(app)
      .post("/api/igrejas")
      .set("schema", SCHEMA)
      .send({ email: "teste@teste.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});