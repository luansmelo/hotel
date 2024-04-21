import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { UpdateUserUseCaseContract } from "@/domain/usecases/user/UpdateUser";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { UserNotFoundError } from "@/presentation/errors/UserNotFoundError";

export class UpdateUserController implements Controller {
  constructor(private readonly updateUser: UpdateUserUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as CreateUserModel

      const result = await this.updateUser.updateById(id, input)

      if (!result) {
        return notFound(new UserNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
