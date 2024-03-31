import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import env from "@/config/env";
import { CreateAuthUseCase } from "@/data/usecases/auth/CreateAuthUseCase";

import { BcryptAdapter } from "@/infra/cryptography";
import { UserRepository } from "@/infra/db/mysql/UserRepository";
import { JwtAdapter } from "@/infra/token";
import { CreateAuthenticationController } from "@/presentation/controllers/auth/CreateAuthenticateController";
import { EmailValidatorAdapter } from "@/utils/EmailValidatorAdapter";

export function makeLoginController(): CreateAuthenticationController {
  const repository = new UserRepository();

  const emailValidator = new EmailValidatorAdapter();

  const hashed = new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn);

  const createAuth = new CreateAuthUseCase(
    repository,
    emailValidator,
    hashed,
    jwtAdapter
  );
  
  return new CreateAuthenticationController(createAuth);
}
