import prisma from "@/config/prisma";

import { BcrypterAdapter, JwtAdapter } from "@/adapters";
import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateAuthenticationController } from "@/controllers/auth/authenticate/createAuthenticateController";
import { UserRepository } from "@/repositories/user.repository";
import { CreateAuthUseCase } from "@/useCase/auth/createAuth/createAuth";
import { EmailValidatorAdapter } from "@/utils/email-validator-adapter";
import env from "@/config/env";

export function makeAuthController(): CreateAuthenticationController {
  const emailValidator = new EmailValidatorAdapter();

  const hashed = new BcrypterAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const jwtAdapter = new JwtAdapter(env.jwt.secret, env.jwt.expiresIn);

  const repository = new UserRepository(prisma);

  const createAuth = new CreateAuthUseCase(
    repository,
    emailValidator,
    hashed,
    jwtAdapter
  );
  return new CreateAuthenticationController(createAuth);
}
