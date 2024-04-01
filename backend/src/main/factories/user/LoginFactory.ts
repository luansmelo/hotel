import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import env from "@/config/env";
import { CreateAuthUseCase } from "@/data/usecases/user/CreateAuthUseCase";
import { BcryptAdapter } from "@/infra/cryptography";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { JwtAdapter } from "@/infra/token";
import { LoginController } from "@/presentation/controllers/user/LoginController";
import { makeLoginValidationFactory } from "./LoginValidationFactory";

export function makeLoginController(): LoginController {
  const repository = new UserRepository();

  const hashed = new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn);

  const createAuth = new CreateAuthUseCase(
    repository,
    hashed,
    jwtAdapter
  );

  return new LoginController(createAuth, makeLoginValidationFactory());
}
