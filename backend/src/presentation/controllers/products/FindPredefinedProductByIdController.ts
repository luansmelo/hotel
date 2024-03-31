
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadPredefinedProductUseCaseContract } from "@/domain/usecases/product/LoadPredefinedProduct";

export class FindPredefinedProductByIdController implements Controller {
  constructor(private readonly product: LoadPredefinedProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const predefinedProduct = await this.product.loadPredefinedProduct(id)

      if (!predefinedProduct) {
        return notFound(new ProductNotFoundError())
      }

      return ok(predefinedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
