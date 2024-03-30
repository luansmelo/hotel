import { BcrypterAdapter } from "@/adapters/BcrypterAdapter";
import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateUserController } from "@/controllers/user/CreateUserController";
import { UserRepository } from "@/repositories/UserRepository";
import { CreateUserUseCase } from "@/useCase/user/CreateUserUseCase";
import { EmailValidatorAdapter } from "@/adapters/EmailValidatorAdapter";

export function makeCreateUserController(): CreateUserController {
  const repository = new UserRepository();

  const emailValidator = new EmailValidatorAdapter();

  const bcryptAdapter = new BcrypterAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const createUser = new CreateUserUseCase(
    repository,
    repository,
    emailValidator,
    bcryptAdapter
  );

  return new CreateUserController(createUser);
}
