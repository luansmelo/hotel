import { FindCategories } from "@/contracts/category";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { FindCategoriesParams } from "@/entities/category/FindCategoriesParams";
import { badRequest, ok } from "@/utils/helpers/httpCodesHelper";
import { Validation } from "../protocols/validator/ValidationProtocol";

export class FindCategoriesController implements Controller {
  constructor(private readonly categories: FindCategories, private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query as FindCategoriesParams;

      const error = this.validation.validate(params);

      if (error) {
        return badRequest(error);
      }

      const categories = await this.categories.findAll(params);

      return ok(categories);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
