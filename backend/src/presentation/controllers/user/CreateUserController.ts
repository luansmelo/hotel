import { CreateUser, CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
