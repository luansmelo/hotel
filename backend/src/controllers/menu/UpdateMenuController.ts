import { UpdateMenu } from "@/contracts/menu/UpdateMenuContract";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class UpdateMenuController implements Controller {
  constructor(private readonly menu: UpdateMenu) { }

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
