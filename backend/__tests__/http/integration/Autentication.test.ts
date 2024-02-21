import request from "supertest";
import { app, server } from "../../../src/index";
import prisma from "../../../src/config/prisma";
import { EmailValidatorAdapter } from "../../../src/utils/email-validator-adapter";
import { UserRepository } from "../../../src/repositories/user.repository";
import { UserService } from "../../../src/services/user.service";

const emailValidator = new EmailValidatorAdapter();
const repository = new UserRepository(prisma);
const User = new UserService(repository, emailValidator);

describe("Autenticação de usuário", () => {
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
    await User.signup(user);

    const response = await request(app).post("/v1/auth").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.anything(),
      name: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
      isAuthorized: expect.any(Boolean),
      access_token: expect.any(String),
    });
  });

  test("deve retornar 401 quando o usuário não for encontrado", async () => {
    const response = await request(app).post("/v1/auth").send({
      email: "any_email@mail.com",
      password: "password@123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  test("deve retornar 401 quando a senha estiver incorreta", async () => {
    await User.signup(user);

    const response = await request(app).post("/v1/auth").send({
      email: user.email,
      password: "password1234",
    });
+
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
