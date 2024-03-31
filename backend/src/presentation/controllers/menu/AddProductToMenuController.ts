import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { AddProductModel, AddProductToMenuUseCaseContract } from "@/domain/usecases/menu/AddProductToMenu";

export class AddProductToMenuController implements Controller {
  constructor(private readonly menu: AddProductToMenuUseCaseContract) { }

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
