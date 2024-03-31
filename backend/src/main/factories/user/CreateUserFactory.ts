import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateUserController } from "@/presentation/controllers/user/CreateUserController";
import { UserRepository } from "@/infra/db/mysql/UserRepository";
import { CreateUserUseCase } from "@/data/usecases/user/CreateUserUseCase";
import { EmailValidatorAdapter } from "@/utils/EmailValidatorAdapter";
import { BcryptAdapter } from "@/infra/cryptography";

export function makeCreateUserController(): CreateUserController {
  const repository = new UserRepository();

  const emailValidator = new EmailValidatorAdapter();

  const bcryptAdapter = new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const createUser = new CreateUserUseCase(
    repository,
    repository,
    emailValidator,
    bcryptAdapter
  );

  return new CreateUserController(createUser);
}
