import { UserServiceContract } from "../utils/contracts/user-contract";
import { UserLoginData, UserRegistrationData } from "../dto/user.dto";

export class UserController {
  constructor(private readonly inputService: UserServiceContract) {}

  async signup(input: UserRegistrationData) {
    return this.inputService.signup(input);
  }

  async signin(input: UserLoginData) {
    return this.inputService.signin(input);
  }
}
