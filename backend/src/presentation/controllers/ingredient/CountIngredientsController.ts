import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CountTotalIngredientsUseCaseContract } from "@/domain/usecases/input/CountTotalIngredient";

export class CountIngredientsController implements Controller {
  constructor(private readonly input: CountTotalIngredientsUseCaseContract) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.input.countTotalIngredients();

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
