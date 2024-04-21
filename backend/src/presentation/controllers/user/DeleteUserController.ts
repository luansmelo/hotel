import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { DeleteUserUseCaseContract } from "@/domain/usecases/user/DeleteUser";
import { UserNotFoundError } from "@/presentation/errors/UserNotFoundError";

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUserUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const result = await this.deleteUser.deleteById(id);

      if (!result) {
        return notFound(new UserNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
