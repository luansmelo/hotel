import { CreateCategory } from "@/contracts/category";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateCategoryController implements Controller {
  constructor(private readonly saveCategory: CreateCategory) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const category = await this.saveCategory.create({
        ...(httpRequest.body as CreateCategoryModel),
      });

      return ok(category);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
