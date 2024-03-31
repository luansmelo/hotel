import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadMenusUseCaseContract } from "@/domain/usecases/menu/LoadMenus";

export class FindMenusController implements Controller {
  constructor(private readonly menus: LoadMenusUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const menus = await this.menus.loadAll()

      return ok(menus)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
