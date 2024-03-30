import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";
import { FindUsers } from "@/contracts/user/FindAllUsers";

export class FindUsersController implements Controller {
  constructor(private readonly users: FindUsers) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const users = await this.users.findUsers()

      return ok(users)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
