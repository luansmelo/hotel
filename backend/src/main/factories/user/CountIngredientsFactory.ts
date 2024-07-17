import { CountTotalUsersUseCase } from "@/data/usecases/user/CountTotalUsersUseCase";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { CountUsersController } from "@/presentation/controllers/user/CountUsersController";

export function makeCountUsersController(): CountUsersController {
  const repository = new UserRepository();
  const users = new CountTotalUsersUseCase(repository);
  return new CountUsersController(users);
}
