import { UserRepository } from "@/repositories/UserRepository";
import { FindUsersController } from "@/controllers/user/FindUsersController";
import { FindUsersUseCase } from "@/useCase/user/FindUsersUseCase";

export function makeFindUsersFactory(): FindUsersController {
  const repository = new UserRepository();

  const findUsers = new FindUsersUseCase(repository)

  return new FindUsersController(findUsers);
}
