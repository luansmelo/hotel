import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { FindMenuModel, LoadMenuUseCaseContract } from "@/domain/usecases/menu/LoadMenu";

export class FindMenuController implements Controller {
  constructor(private readonly menu: LoadMenuUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const param = httpRequest.params as FindMenuModel
      
      const menu = await this.menu.loadMenu(param)

      if (!menu) {
        return notFound(new MenuNotFoundError())
      }

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
