import { UserServiceContract } from "../utils/contracts/user-contract";
import { UserLoginInput, UserContractInput } from "../dto/user.dto";

export class UserController {
  constructor(private readonly service: UserServiceContract) {}

  async signup(input: UserContractInput) {
    return this.service.signup(input);
  }

  async signin(input: UserLoginInput) {
    return this.service.signin(input);
  }
}
