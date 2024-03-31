import { CreateUser, CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { Validation } from "@/validation/protocols";

export class CreateUserController implements Controller {
  constructor(
    private readonly user: CreateUser,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(httpRequest.body)

      if(error) {
        return badRequest(error)
      }

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
