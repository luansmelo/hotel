
import { LoadUserByIdRepository } from "@/data/protocols/db/user/LoadUserByIdRepository.protocol";
import { LoadUserByIdUseCaseContract } from "@/domain/usecases/user/LoadUserById";
import { UserModel } from "@/domain/models/User";

export class LoadUserByIdUseCase implements LoadUserByIdUseCaseContract {
  constructor(private readonly user: LoadUserByIdRepository) {}

  async loadById(id: string): Promise<UserModel> {
    const user = await this.user.loadById(id);

    return {
      ...user,
      password: undefined
    }
  }
}
