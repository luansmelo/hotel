import { FindMenu } from "@/contracts/menu/FindMenuContract";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
