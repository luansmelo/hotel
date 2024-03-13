import { AddInputToProduct } from "@/contracts/product";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class AddInputToProductController implements Controller {
  constructor(private readonly product: AddInputToProduct) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const input = httpRequest.body as AddInputToProductModel

      const product = await this.product.addInput(input)

      if (!product) {
        return forbidden(new AccessDeniedError())
      }

      return ok(product)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
