import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { CreateProductModel, CreateProductUseCaseContract } from "@/domain/usecases/product/CreateProduct";

export class CreateProductController implements Controller {
  constructor(private readonly product: CreateProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product = httpRequest.body as CreateProductModel

      const createdProduct = await this.product.create(product)

      if (!createdProduct) {
        return forbidden(new AccessDeniedError())
      }

      return ok(createdProduct)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
