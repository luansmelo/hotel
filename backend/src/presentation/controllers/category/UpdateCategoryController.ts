import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { CategoryNotFoundError } from "@/presentation/errors/CategoryNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { UpdateCategoryUseCaseContract } from "@/domain/usecases/category/UpdateCategory";
import { CategoryModel } from "@/domain/models/Category";

export class UpdateCategoryController implements Controller {
  constructor(private readonly updateCategory: UpdateCategoryUseCaseContract) { }

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
