
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CreateCategoryModel, CreateCategoryUseCaseContract } from "@/domain/usecases/category/CreateCategory";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";

export class CreateCategoryController implements Controller {
  constructor(
    private readonly saveCategory: CreateCategoryUseCaseContract,
    private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const body = httpRequest.body as CreateCategoryModel;

      const category = await this.saveCategory.create(body);

      return ok(category);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
