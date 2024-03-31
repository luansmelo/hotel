import { FindProducts } from "@/contracts/product";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class FindProductsController implements Controller {
  constructor(private readonly products: FindProducts) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.products.findAll()

      return ok(products)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
