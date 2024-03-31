import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { DeleteProductUseCaseContract } from "@/domain/usecases/product/DeleteProduct";

export class DeleteProductController implements Controller {
  constructor(private readonly product: DeleteProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest,): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const deletedProduct = await this.product.deleteById(id)

      return ok(deletedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
