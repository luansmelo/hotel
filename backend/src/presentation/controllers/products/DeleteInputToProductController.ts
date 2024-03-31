import { DeleteInputToProduct } from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";

export class DeleteInputToProductController implements Controller {
  constructor(private readonly product: DeleteInputToProduct) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product = httpRequest.params as RemoveInputToProductModel

      const deletedProduct = await this.product.deleteInputToProductById(product)

      if (!deletedProduct) {
        return forbidden(new AccessDeniedError())
      }

      return ok(deletedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
