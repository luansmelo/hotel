import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { FindCategoriesParams } from "@/entities/category/FindCategoriesParams";
import { Validation } from "../../protocols/validator/ValidationProtocol";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadCategoriesUseCaseContract } from "@/domain/usecases/category/LoadCategories";

export class FindCategoriesController implements Controller {
  constructor(
    private readonly categories: LoadCategoriesUseCaseContract,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query as FindCategoriesParams;

      const error = this.validation.validate(params);

      if (error) {
        return badRequest(error);
      }

      const categories = await this.categories.loadAll(params);

      return ok(categories);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
