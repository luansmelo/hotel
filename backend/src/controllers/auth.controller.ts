import { AuthServiceContract } from "../utils/contracts/auth-contract";
import { AuthDTO } from "../dto/auth.dto";

export class AuthController {
  constructor(private readonly authService: AuthServiceContract) {}

  async signin(input: AuthDTO) {
    return this.authService.signin(input);
  }
}

