import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { FindUsersParams, FindUsersResponse } from "@/domain/usecases/user/FindUsersParams";
import { LoadUsers } from "@/domain/usecases/user/LoadUsers";

export class LoadUsersUseCase implements LoadUsers {
  constructor(private readonly users: LoadUsersRepository) {}

  async loadAll(params: FindUsersParams): Promise<FindUsersResponse> {
    return this.users.loadAll(params);
  }
}
