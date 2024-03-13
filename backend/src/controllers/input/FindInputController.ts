import { FindInputs } from "@/contracts/input";
import { FindInputsParams } from "@/entities/input/FindInputsParams";
import { Validation } from "@/validators/sort/SortInputValidator";
import { badRequest, ok } from "@/utils/helpers/httpCodesHelper";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { Controller } from "../protocols/controller";

export class FindInputsController implements Controller {
  constructor(
    private readonly inputs: FindInputs,
    private readonly validation: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const params = request.query as FindInputsParams;
      const error = this.validation.validate(params);

      if (error) {
        return badRequest(error);
      }

      const inputs = await this.inputs.findAll(params);

      return ok(inputs);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
