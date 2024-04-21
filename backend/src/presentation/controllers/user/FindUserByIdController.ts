import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadUserByIdUseCaseContract } from "@/domain/usecases/user/LoadUserById";
import { UserNotFoundError } from "@/presentation/errors/UserNotFoundError";

export class FindUserByIdController implements Controller {
  constructor(private readonly user: LoadUserByIdUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const user = await this.user.loadById(id);

      if (!user) {
        return notFound(new UserNotFoundError())
      }

      return ok(user)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
