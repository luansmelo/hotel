import { DeleteInputToProduct } from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

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
