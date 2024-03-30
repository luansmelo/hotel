import { FindCategoryById } from "@/contracts/category";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { CategoryNotFoundError } from "@/utils/errors/CategoryNotFoundError";

export class FindCategoryByIdController implements Controller {
  constructor(private readonly category: FindCategoryById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const result = await this.category.findById(id);

      if (!result) {
        return notFound(new CategoryNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
