import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { LoadUsers } from "@/domain/usecases/user/LoadUsers";
import { Validation } from "@/validation/protocols";

export class LoadUsersController implements Controller {
  constructor(private readonly users: LoadUsers, private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)

      if (error) {
        return badRequest(error)
      }

      const users = await this.users.loadAll(httpRequest.query)

      return ok(users)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
