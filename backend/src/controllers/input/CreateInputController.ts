import { CreateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { Controller } from "../protocols/controller";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateInputController implements Controller {
  constructor(private readonly input: CreateInput) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const input = await this.input.create({
        ...(httpRequest.body as CreateInputModel),
      });

      return ok(input);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
