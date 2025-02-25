import { InvalidCredentialsError } from "@/presentation/errors/InvalidCredentialsError";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { badRequest, ok, unauthorized } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { Authentication, AuthenticationModel } from "@/domain/usecases/user/Authentication";
import { Validation } from "@/validation/protocols";

export class LoginController implements Controller {
  constructor(
    private readonly auth: Authentication,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const input = httpRequest.body as AuthenticationModel;

      const auth = await this.auth.auth(input);

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
