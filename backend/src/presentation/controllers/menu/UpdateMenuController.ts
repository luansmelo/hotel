import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { UpdateMenuUseCaseContract } from "@/domain/usecases/menu/UpdateMenu";
import { CreateMenuModel } from "@/domain/usecases/menu/CreateMenu";

export class UpdateMenuController implements Controller {
  constructor(private readonly menu: UpdateMenuUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as CreateMenuModel

      const menu = await this.menu.updateById(id, input)

      if (!menu) {
        return forbidden(new AccessDeniedError())
      }

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
