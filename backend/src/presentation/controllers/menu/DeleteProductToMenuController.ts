import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { DeleteProductToMenuUseCaseContract, RemoveProductModel } from "@/domain/usecases/menu/DeleteProductToMenu";

export class DeleteProductToMenuController implements Controller {
  constructor(private readonly menu: DeleteProductToMenuUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const input = httpRequest.params as RemoveProductModel

      const menu = await this.menu.deleteProduct(input)

      return ok(menu)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
