import { CategoryModel, UpdateCategory } from "@/contracts/category";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { CategoryNotFoundError } from "@/utils/errors/CategoryNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class UpdateCategoryController implements Controller {
  constructor(private readonly updateCategory: UpdateCategory) { }

  async handle(httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpResquest.params as { id: string }
      const payload = httpResquest.body as CategoryModel

      const result = await this.updateCategory.updateById(id, payload);

      if (!result) {
        return notFound(new CategoryNotFoundError())
      }

      return ok(result)

    } catch (error) {
      return errorHandler(error)
    }
  }
}
