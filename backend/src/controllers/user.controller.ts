import { UserServiceContract } from "@/utils/contracts/user-contract";
import { AuthPayload, UserContractInput } from "@/dto/user.dto";

export class UserController {
  constructor(private readonly service: UserServiceContract) {}

  async signup(input: UserContractInput) {
    return this.service.signup(input);
  }

  async signin(input: AuthPayload) {
    return this.service.authenticate(input);
  }
}
