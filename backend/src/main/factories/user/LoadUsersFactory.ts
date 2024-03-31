import { LoadUsersUseCase } from "@/data/usecases/user/LoadUsers";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";

import { LoadUsersController } from "@/presentation/controllers/user/LoadUsersController";

export function makeLoadUsersFactory(): LoadUsersController {
  const repository = new UserRepository();

  const findUsers = new LoadUsersUseCase(repository)

  return new LoadUsersController(findUsers);
}
