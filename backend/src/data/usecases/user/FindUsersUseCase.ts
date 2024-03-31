import {
  UserModel,
} from "@/contracts/user";
import { FindUsers, FindUsersContract } from "@/contracts/user/FindAllUsers";

export class FindUsersUseCase implements FindUsers {
  constructor(private readonly findUser: FindUsersContract) {}

  async findUsers(): Promise<UserModel[]> {
    return this.findUser.findUsers();
  }
}
