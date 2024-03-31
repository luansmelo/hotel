import { FindCategoryById } from "@/contracts/category";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { CategoryNotFoundError } from "@/presentation/errors/CategoryNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
