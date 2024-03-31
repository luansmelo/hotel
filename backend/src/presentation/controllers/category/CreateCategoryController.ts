import { CreateCategory } from "@/contracts/category";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { Validation } from "../../protocols/validator/ValidationProtocol";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class CreateCategoryController implements Controller {
  constructor(private readonly saveCategory: CreateCategory, private readonly validation: Validation) { }

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
