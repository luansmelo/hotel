import { UserServiceContract } from "../utils/contracts/user-contract";
import { UserLoginInput, UserContractInput } from "../dto/user.dto";

export class UserController {
  constructor(private readonly inputService: UserServiceContract) {}

  async signup(input: UserContractInput) {
    return this.inputService.signup(input);
  }

  async signin(input: UserLoginInput) {
    return this.inputService.signin(input);
  }
}
