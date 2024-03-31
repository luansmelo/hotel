import { UserRepository } from "@/infra/db/mysql/UserRepository";
import { FindUsersController } from "@/presentation/controllers/user/FindUsersController";
import { FindUsersUseCase } from "@/data/usecases/user/FindUsersUseCase";

export function makeFindUsersFactory(): FindUsersController {
  const repository = new UserRepository();

  const findUsers = new FindUsersUseCase(repository)

  return new FindUsersController(findUsers);
}
