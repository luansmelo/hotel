import { DeleteProductToMenu } from "@/contracts/menu/DeleteProductToMenuContract";
import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class DeleteProductToMenuController implements Controller {
  constructor(private readonly menu: DeleteProductToMenu) { }

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
