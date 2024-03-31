import { FindPredefinedProductById } from "@/contracts/product/FindPredefinedProductByIdContract";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
