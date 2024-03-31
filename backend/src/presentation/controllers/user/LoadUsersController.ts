import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { LoadUsers } from "@/domain/usecases/user/LoadUsers";

export class LoadUsersController implements Controller {
  constructor(private readonly users: LoadUsers) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const users = await this.users.loadAll()

      return ok(users)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
