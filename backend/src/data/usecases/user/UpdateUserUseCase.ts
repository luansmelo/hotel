import { Hasher } from "@/data/protocols/cryptography";
import { LoadUserByIdRepository } from "@/data/protocols/db/user/LoadUserByIdRepository.protocol";
import { UpdateUserRepository } from "@/data/protocols/db/user/UpdateUserRepository.protocol";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { UpdateUserUseCaseContract } from "@/domain/usecases/user/UpdateUser";
import { UserNotFoundError } from "@/presentation/errors/UserNotFoundError";

export class UpdateUserUseCase implements UpdateUserUseCaseContract {
  constructor(
    private readonly updateUser: UpdateUserRepository,
    private readonly findUser: LoadUserByIdRepository,
    private readonly hasher: Hasher,
  ) { }

  async updateById(
    id: string,
    input: Partial<CreateUserModel>
  ) {
    const user = await this.findUser.loadById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    let hashed_password: string;    

    if (user && user?.password) {
      hashed_password = await this.hasher.hash(input.password);
    }

    const data = Object.assign({}, input, { password: hashed_password });

    return this.updateUser.updateById(user.id, { ...data });
  }
}
