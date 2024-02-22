import request from "supertest";
import prisma from "../../../src/config/prisma";
import bcrypt from "bcrypt";
import { app, server } from "../../../src/index";

describe("Criação de conta", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  const user = {
    name: "John Doe",
    email: "john@email.com",
    password: "password123",
  };

  test("deve retornar 200 com os dados do usuário e o token JWT", async () => {
    const response = await request(app).post("/v1/user/signup").send(user);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.anything(),
      name: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
    });
  });

  test("deve retornar 400 ao tentar criar uma conta sem fornecer os campos obrigatórios", async () => {
    const response = await request(app).post("/v1/user/signup").send({});

    expect(response.status).toBe(400);
  });

  test("deve retornar 400 ao tentar criar uma conta com um e-mail já existente", async () => {
    await request(app).post("/v1/user/signup").send({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    });

    const response = await request(app).post("/v1/user/signup").send({
      name: "John Doe",
      email: "jane.smith@example.com",
      password: "password789",
    });

    expect(response.status).toBe(400);
  });

  test("deve retornar 400 ao tentar criar uma conta com um e-mail inválido", async () => {
    const response = await request(app).post("/v1/user/signup").send({
      name: "John Doe",
      email: "john.doe",
      password: "password123",
    });

    expect(response.status).toBe(400);
  });

  test("deve armazenar a senha do usuário de forma criptografada", async () => {
    const password = "password123";
    const response = await request(app).post("/v1/user/signup").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.anything(),
      name: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
    });

    const userInDB = await prisma.user.findUnique({
      where: { email: "john.doe@example.com" },
    });

    expect(userInDB).toBeTruthy();
    expect(await bcrypt.compare(password, userInDB!.password)).toBe(true);
  });

  test("deve retornar 500 caso ocorra algum erro na criação do usuário", async () => {
    jest.spyOn(prisma.user, "create").mockImplementationOnce(() => {
      console.log("Mock signup called");
      throw new Error();
    });

    const response = await request(app).post("/v1/user/signup").send({
      name: "John Doe",
      email: "valid@email.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
  });

  test("não deve retornar o campo da senha do usuário", async () => {
    const response = await request(app).post("/v1/user/signup").send({
      name: "John Doe",
      email: "john@email.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("password");
  });
});
