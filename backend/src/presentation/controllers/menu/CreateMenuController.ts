import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CreateMenuModel, CreateMenuUseCaseContract } from "@/domain/usecases/menu/CreateMenu";

export class CreateMenuController implements Controller {
  constructor(private readonly menu: CreateMenuUseCaseContract) { }

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
