import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadMenusUseCaseContract } from "@/domain/usecases/menu/LoadMenus";
import { FindMenuParams } from "@/domain/usecases/menu/FindMenuParams";
import { Validation } from "@/validation/protocols";

export class FindMenusController implements Controller {
  constructor(
    private readonly menus: LoadMenusUseCaseContract,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const params = httpRequest.query as FindMenuParams

      const error = this.validation.validate(params)

      if (error) {
        return badRequest(error)
      }

      const menus = await this.menus.loadAll(params)

      return ok(menus)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
