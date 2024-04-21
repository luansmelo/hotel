
import { UpdateUserController } from "@/presentation/controllers/user/UpdateUserController";
import { UpdateUserUseCase } from "@/data/usecases/user/UpdateUserUseCase";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { BcryptAdapter } from "@/infra/cryptography";
import { CRYPTOGRAPHY_SALTING_ROUNDS } from "@/config/constants";

export function makeUpdateUser(): UpdateUserController {
  const repo = new UserRepository();

  const bcryptAdapter = new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);

  const updateUser = new UpdateUserUseCase(repo, repo, bcryptAdapter);

  return new UpdateUserController(updateUser);
}
