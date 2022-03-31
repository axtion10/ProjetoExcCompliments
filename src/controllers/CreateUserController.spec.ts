import request from "supertest";
import { app } from "../server";
import { createConnection } from "typeorm";
import { v4 as uuid } from  "uuid";

beforeAll(async () =>{
  await createConnection();
});

describe("Create user controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "test-integration",
      email: "testIntegrationaaa@test.com.br",
      admin: false,
      password: "test123"
    });
    expect(response.status).toBe(200);
  });

});