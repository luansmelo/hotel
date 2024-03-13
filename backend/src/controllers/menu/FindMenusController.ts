import { FindMenus } from "@/contracts/menu/FindMenusContract";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

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
