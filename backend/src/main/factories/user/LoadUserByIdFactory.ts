import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { LoadUserByIdUseCase } from "@/data/usecases/user/LoadUserByIdUseCase";
import { FindUserByIdController } from "@/presentation/controllers/user/FindUserByIdController";

export function makeFindUserById(): FindUserByIdController {
  const repo = new UserRepository();

  const findUserById = new LoadUserByIdUseCase(repo);

  return new FindUserByIdController(findUserById);
}
