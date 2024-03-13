import { DeleteProduct } from "@/contracts/product";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class DeleteProductController implements Controller {
  constructor(private readonly product: DeleteProduct) { }

  async handle(httpRequest: HttpRequest,): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const deletedProduct = await this.product.deleteById(id)

      if (!deletedProduct) {
        return forbidden(new AccessDeniedError())
      }

      return ok(deletedProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
