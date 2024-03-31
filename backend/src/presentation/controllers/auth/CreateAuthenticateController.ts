import { CreateAuth } from "@/contracts/auth/AuthenticationContract";
import { CreateAuthModel } from "@/entities/auth/auth";
import { InvalidCredentialsError } from "@/presentation/errors/InvalidCredentialsError";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok, unauthorized } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class CreateAuthenticationController implements Controller {
  constructor(private readonly auth: CreateAuth) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const input = httpRequest.body as CreateAuthModel;

      const auth = await this.auth.authenticate(input);

      if (!auth)
        return unauthorized(
          new InvalidCredentialsError("Email ou senha inválidos")
        );

      return ok(auth);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
