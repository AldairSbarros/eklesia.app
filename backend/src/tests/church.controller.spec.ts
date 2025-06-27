import request from "supertest";
import app from "../app";


describe("Church Controller", () => {
  it("deve retornar erro 400 se nome não for informado", async () => {
    const res = await request(app)
      .post("/api/igrejas")
      .send({ email: "teste@teste.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});