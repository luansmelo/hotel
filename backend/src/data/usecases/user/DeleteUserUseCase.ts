import { DeleteUserRepository } from "@/data/protocols/db/user/DeleteUserRepository.protocol.ts";
import { LoadUserByIdRepository } from "@/data/protocols/db/user/LoadUserByIdRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { DeleteUserUseCaseContract } from "@/domain/usecases/user/DeleteUser";
import { UserNotFoundError } from "@/presentation/errors/UserNotFoundError";

export class DeleteUserUseCase implements DeleteUserUseCaseContract {
  constructor(
    private readonly deleteUser: DeleteUserRepository,
    private readonly findUser: LoadUserByIdRepository
  ) {}

  async deleteById(id: string): Promise<UserModel> {
    const user = await this.findUser.loadById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return this.deleteUser.deleteById(user.id);
  }
}
