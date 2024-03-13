import { CreateMenu } from "@/contracts/menu/CreateMenuContract";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateMenuController implements Controller {
  constructor(private readonly menu: CreateMenu) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const input = httpRequest.body as CreateMenuModel

      const menu = await this.menu.create(input)

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
