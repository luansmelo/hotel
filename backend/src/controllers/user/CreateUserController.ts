import { CreateUser } from "@/contracts/user";
import { CreateUserModel } from "@/entities/user/createUser";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateUserController implements Controller {
  constructor(private readonly user: CreateUser) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const input = httpRequest.body as CreateUserModel

      const createUser = await this.user.create(input);

      return ok({
        ...createUser,
        password: undefined
      })

    } catch (error) {
      return errorHandler(error)
    }
  }
}
