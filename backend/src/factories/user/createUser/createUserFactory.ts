import { BcrypterAdapter } from "@/adapters/bcrypter.adapter";
import prisma from "@/config/prisma";
import { CreateUserController } from "@/controllers/user/createUser/createUserController";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/useCase/user/createUser/createUser";
import { FindUserByEmailUseCase } from "@/useCase/user/findUserByEmail/findUserByEmail";
import { EmailValidatorAdapter } from "@/utils/email-validator-adapter";
export function makeCreateUserController(): CreateUserController {
  const repository = new UserRepository(prisma);

  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcrypterAdapter(10);

  const findUserByEmail = new FindUserByEmailUseCase(repository);

  const createUser = new CreateUserUseCase(
    repository,
    findUserByEmail,
    emailValidator,
    bcryptAdapter
  );

  return new CreateUserController(createUser);
}
