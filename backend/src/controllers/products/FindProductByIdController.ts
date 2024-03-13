import { FindProductById } from "@/contracts/product";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";

export class FindProductByIdController implements Controller {
  constructor(private readonly product: FindProductById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const foundProduct = await this.product.findById(id)

      if (!foundProduct) {
        return notFound(new ProductNotFoundError())
      }

      return ok(foundProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
