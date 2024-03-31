import { FindMenuById } from "@/contracts/menu/FindMenuByIdContract";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class FindMenuByIdController implements Controller {
  constructor(private readonly menu: FindMenuById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const menu = await this.menu.findById(id);

      if (!menu) {
        return notFound(new MenuNotFoundError())
      }

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }


  }
}
