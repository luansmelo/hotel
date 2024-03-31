import { UpdateProduct } from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";

export class UpdateProductController implements Controller {
  constructor(private readonly product: UpdateProduct) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as CreateProductModel

      const result = await this.product.updateById(id, input);

      if (!result) {
        return forbidden(new AccessDeniedError())
      }

      return ok(result)

    } catch (error) {
      return errorHandler(error)
    }
  }
}