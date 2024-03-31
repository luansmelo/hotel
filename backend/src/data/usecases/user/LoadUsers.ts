import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUsers } from "@/domain/usecases/user/LoadUsers";

export class LoadUsersUseCase implements LoadUsers {
  constructor(private readonly users: LoadUsersRepository) {}

  async loadAll(): Promise<UserModel[] | null> {
    return this.users.loadAll();
  }
}
