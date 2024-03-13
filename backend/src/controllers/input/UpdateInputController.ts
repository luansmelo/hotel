import { UpdateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { Controller } from "../protocols/controller";

export class UpdateInputController implements Controller {
  constructor(private readonly updateInput: UpdateInput) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params as { id: string };
      const payload = request.body as CreateInputModel;

      const input = await this.updateInput.updateById(id, payload);

      if (!input) {
        return forbidden(new AccessDeniedError());
      }

      return ok(input);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
