import { Validation } from "@/validators/sort/SortInputValidator";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { Controller } from "../../protocols/controller";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { FindInputsParams } from "@/domain/usecases/input/FindInputsParams";
import { LoadInputsUseCaseContract } from "@/domain/usecases/input/LoadInputs";

export class FindInputsController implements Controller {
  constructor(
    private readonly inputs: LoadInputsUseCaseContract,
    private readonly validation: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const params = request.query as FindInputsParams;
      const error = this.validation.validate(params);

      if (error) {
        return badRequest(error);
      }

      const inputs = await this.inputs.loadAll(params);

      return ok(inputs);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
