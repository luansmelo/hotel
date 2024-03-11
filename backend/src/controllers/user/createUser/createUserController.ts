import { CreateUser } from "@/contracts/user";
import { CreateUserModel } from "@/entities/user/createUser";

export class CreateUserController {
  constructor(private readonly user: CreateUser) {}

  async signup(input: CreateUserModel) {
    return this.user.create(input);
  }
}