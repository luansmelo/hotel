import { UserServiceContract } from "@/utils/contracts/user-contract";
import { AuthPayload } from "@/dto/user.dto";

export class AuthController {
  constructor(private readonly service: UserServiceContract) {}

  async authenticate(input: AuthPayload) {
    return this.service.authenticate(input);
  }
}
