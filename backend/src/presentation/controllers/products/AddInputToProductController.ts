import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { AddInputToProductModel, AddInputToProductUseCaseContract } from "@/domain/usecases/product/AddInputToProduct";

export class AddInputToProductController implements Controller {
  constructor(private readonly product: AddInputToProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const input = httpRequest.body as AddInputToProductModel

      const product = await this.product.addProduct(input)

      if (!product) {
        return forbidden(new AccessDeniedError())
      }

      return ok(product)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
