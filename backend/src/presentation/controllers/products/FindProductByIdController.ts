import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadProductByIdUseCaseContract } from "@/domain/usecases/product/LoadProductById";

export class FindProductByIdController implements Controller {
  constructor(private readonly product: LoadProductByIdUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const foundProduct = await this.product.loadById(id)

      if (!foundProduct) {
        return notFound(new ProductNotFoundError())
      }

      return ok(foundProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
