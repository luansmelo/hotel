import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { DeleteUserUseCase } from "@/data/usecases/user/DeleteUserUseCase";
import { DeleteUserController } from "@/presentation/controllers/user/DeleteUserController";

export function makeDeleteUser(): DeleteUserController {
  const repo = new UserRepository();

  const deleteUser = new DeleteUserUseCase(repo, repo);

  return new DeleteUserController(deleteUser);
}
