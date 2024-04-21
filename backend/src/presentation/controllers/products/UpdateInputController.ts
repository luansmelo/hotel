import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { UpdateProductModel, UpdateProductUseCaseContract } from "@/domain/usecases/product/UpdateProduct";

export class UpdateProductController implements Controller {
  constructor(private readonly product: UpdateProductUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as UpdateProductModel

      const result = await this.product.updateById(id, input);

      return ok(result)

    } catch (error) {
      return errorHandler(error)
    }
  }
}
