import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { Controller } from "../../protocols/controller";
import { Validation } from "@/validation/protocols";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CreateInputModel, CreateInputUseCaseContract } from "@/domain/usecases/input/CreateInput";

export class CreateInputController implements Controller {
  constructor(private readonly input: CreateInputUseCaseContract, private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error)
      }

      const body = httpRequest.body as CreateInputModel;

      const input = await this.input.create(body);

      return ok(input);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
