import { FindMenus } from "@/contracts/menu/FindMenusContract";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class FindMenusController implements Controller {
  constructor(private readonly menus: FindMenus) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const menus = await this.menus.findAll()

      return ok(menus)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
