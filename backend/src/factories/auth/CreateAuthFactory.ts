import prisma from "@/config/prisma";

import { BcrypterAdapter, JwtAdapter } from "@/adapters";
import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateAuthenticationController } from "@/controllers/auth/CreateAuthenticateController";
import { UserRepository } from "@/repositories/UserRepository";
import { CreateAuthUseCase } from "@/useCase/auth/CreateAuthUseCase";
import { EmailValidatorAdapter } from "@/adapters/email-validator-adapter";
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
