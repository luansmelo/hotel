import { FindPredefinedProductById } from "@/contracts/product/FindPredefinedProductByIdContract";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class FindPredefinedProductByIdController implements Controller {
  constructor(private readonly product: FindPredefinedProductById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const predefinedProduct = await this.product.findPredefinedById(id)

      if (!predefinedProduct) {
        return notFound(new ProductNotFoundError())
      }

      return ok(predefinedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
