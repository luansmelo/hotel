import {
  FindUserByEmail,
  FindUserByEmailContract,
  UserModel,
} from "@/contracts/user";

export class FindUserByEmailUseCase implements FindUserByEmail {
  constructor(private readonly findUser: FindUserByEmailContract) {}

  async findByEmail(email: string): Promise<UserModel> {
    return this.findUser.findByEmail(email);
  }
}
