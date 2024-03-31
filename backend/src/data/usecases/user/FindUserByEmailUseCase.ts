import {
  FindUserByEmail,
  FindUserByEmailContract,
} from "@/contracts/user";
import { UserModel } from "@/domain/models/User";

export class FindUserByEmailUseCase implements FindUserByEmail {
  constructor(private readonly findUser: FindUserByEmailContract) {}

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.findUser.findByEmail(email);
  }
}
