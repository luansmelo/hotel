import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadMenuByIdUseCaseContract } from "@/domain/usecases/menu/LoadMenuById";

export class FindMenuByIdController implements Controller {
  constructor(private readonly menu: LoadMenuByIdUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const menu = await this.menu.loadById(id);

      if (!menu) {
        return notFound(new MenuNotFoundError())
      }

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }


  }
}
