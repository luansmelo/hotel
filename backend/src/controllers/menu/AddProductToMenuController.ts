import { AddProductToMenu } from "@/contracts/menu/AddProductToMenuContract";
import { AddProductModel } from "@/entities/menu/AddProductToMenuEntity";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class AddProductToMenuController implements Controller {
  constructor(private readonly menu: AddProductToMenu) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const input = httpRequest.body as AddProductModel

      const result = await this.menu.addProduct(input);

      if (!result) {
        return forbidden(new AccessDeniedError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
