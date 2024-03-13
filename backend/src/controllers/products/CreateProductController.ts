import { CreateProduct } from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class CreateProductController implements Controller {
  constructor(private readonly product: CreateProduct) { }

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
