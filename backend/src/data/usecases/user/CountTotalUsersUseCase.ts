import { CountTotalUserRepository } from "@/data/protocols/db/user/CountTotalUserRepository.protocol";
import { CountTotalUsersUseCaseContract } from "@/domain/usecases/user/CountTotalUsers";

export class CountTotalUsersUseCase implements CountTotalUsersUseCaseContract {
  constructor(private readonly users: CountTotalUserRepository) { }

  async countTotalUsers(): Promise<number> {
    return this.users.countTotalUsers();
  }
}
