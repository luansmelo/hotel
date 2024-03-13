import prisma from "@/config/prisma";

import { BcrypterAdapter } from "@/adapters/BcrypterAdapter";
import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateUserController } from "@/controllers/user/CreateUserController";
import { UserRepository } from "@/repositories/UserRepository";
import { CreateUserUseCase } from "@/useCase/user/CreateUserUseCase";
import { FindUserByEmailUseCase } from "@/useCase/user/FindUserByEmailUseCase";
import { EmailValidatorAdapter } from "@/adapters/EmailValidatorAdapter";

export function makeCreateUserController(): CreateUserController {
  const repository = new UserRepository(prisma);

  const emailValidator = new EmailValidatorAdapter();

  const bcryptAdapter = new BcrypterAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const findUserByEmail = new FindUserByEmailUseCase(repository);

  const createUser = new CreateUserUseCase(
    repository,
    findUserByEmail,
    emailValidator,
    bcryptAdapter
  );

  return new CreateUserController(createUser);
}
