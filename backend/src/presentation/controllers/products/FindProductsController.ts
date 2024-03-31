import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadProductsUseCaseContract } from "@/domain/usecases/product/LoadProducts";

export class FindProductsController implements Controller {
  constructor(private readonly products: LoadProductsUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.products.loadAll()

      return ok(products)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
