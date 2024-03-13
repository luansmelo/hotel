import { FindMenu } from "@/contracts/menu/FindMenuContract";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";

export class FindMenuController implements Controller {
  constructor(private readonly menu: FindMenu) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const param = httpRequest.params as FindMenuModel

      const menu = await this.menu.findMenu(param)

      if (!menu) {
        return notFound(new MenuNotFoundError())
      }

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
