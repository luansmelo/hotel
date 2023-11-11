import { AccountUseCases } from "../../domain/use-cases/account";
import { HttpResponse, serverError } from "../contracts/http";
import { ok } from "../contracts/http";
import { Controller } from "../contracts/controller";

export class SignUpController implements Controller {
  constructor(private readonly service: AccountUseCases) {}
  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const data = await this.service.create(request);

      return ok(data);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
  };
}
