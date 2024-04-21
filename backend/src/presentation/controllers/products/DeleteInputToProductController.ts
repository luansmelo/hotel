import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { DeleteInputToProductUseCaseContract, RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";

export class DeleteInputToProductController implements Controller {
  constructor(private readonly product: DeleteInputToProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product = httpRequest.params as RemoveInputToProductModel
      
      const deletedProduct = await this.product.deleteProduct(product)

      return ok(deletedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
