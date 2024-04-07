import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadProductsUseCaseContract } from "@/domain/usecases/product/LoadProducts";
import { Validation } from "@/validation/protocols";

export class FindProductsController implements Controller {
  constructor(
    private readonly products: LoadProductsUseCaseContract,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(httpRequest.query)

      if (error) {
        return badRequest(error)
      }

      const products = await this.products.loadAll(httpRequest.query)

      return ok(products)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
