import { LoadUsersUseCase } from "@/data/usecases/user/LoadUsers";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { LoadUsersController } from "@/presentation/controllers/user/LoadUsersController";
import { ValidationComposite } from "@/validation/validators";
import { SortUsersValidator } from "@/validation/validators/SortUsersValidator";

export function makeLoadUsersFactory(): LoadUsersController {
  const repository = new UserRepository();

  const findUsers = new LoadUsersUseCase(repository)

  const validation = new SortUsersValidator();

  const composition = new ValidationComposite([validation]);

  return new LoadUsersController(findUsers, composition);
}
