import { FindCategories } from "@/contracts/category";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { FindCategoriesParams } from "@/entities/category/FindCategoriesParams";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class FindCategoriesController implements Controller {
  constructor(private readonly categories: FindCategories) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params as FindCategoriesParams;

      const categories = await this.categories.findAll(params);

      return ok(categories);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
