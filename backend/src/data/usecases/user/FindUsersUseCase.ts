import { FindUsers, FindUsersContract } from "@/contracts/user/FindAllUsers";
import { UserModel } from "@/domain/models/User";

export class FindUsersUseCase implements FindUsers {
  constructor(private readonly findUser: FindUsersContract) {}

  async findUsers(): Promise<UserModel[]> {
    return this.findUser.findUsers();
  }
}
