import { CreateAuth } from "@/contracts/auth/authentication";
import { CreateAuthModel } from "@/entities/auth/auth";

export class CreateAuthenticationController {
  constructor(private readonly auth: CreateAuth) {}

  async authenticate(input: CreateAuthModel) {
    return this.auth.authenticate(input);
  }
}
