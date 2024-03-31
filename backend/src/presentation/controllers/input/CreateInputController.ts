import { CreateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { Controller } from "../../protocols/controller";
import { Validation } from "../../protocols/validator/ValidationProtocol";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class CreateInputController implements Controller {
  constructor(private readonly input: CreateInput, private readonly validation: Validation) { }

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
