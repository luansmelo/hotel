import { CreateAuth } from "@/contracts/auth/AuthenticationContract";
import { CreateAuthModel } from "@/entities/auth/auth";
import { InvalidCredentialsError } from "@/utils/errors/InvalidCredentialsError";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok, unauthorized } from "@/utils/helpers/httpCodesHelper";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";

export class CreateAuthenticationController implements Controller {
  constructor(private readonly auth: CreateAuth) {}

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
