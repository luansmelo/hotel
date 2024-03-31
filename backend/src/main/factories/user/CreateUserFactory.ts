import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";
import { CreateUserController } from "@/presentation/controllers/user/CreateUserController";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { CreateUserUseCase } from "@/data/usecases/user/CreateUser";
import { BcryptAdapter } from "@/infra/cryptography";
import { makeCreateAccountValidationFactory } from "./CreateUserValidationFactory";

export function makeCreateUserController(): CreateUserController {
  const repository = new UserRepository();

  const bcryptAdapter = new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const createUser = new CreateUserUseCase(
    repository,
    repository,
    bcryptAdapter
  );

  return new CreateUserController(createUser, makeCreateAccountValidationFactory());
}
