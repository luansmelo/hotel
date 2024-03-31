import { UpdateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { FORBIDDEN_UPDATE_UPDATING_INPUT } from "@/utils/errors/pt-br";
import { Controller, HttpRequest, HttpResponse, Validation } from "../../protocols";
import { MissingParamError } from "@/utils/errors/MissingParamError";
import { badRequest, forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
export class UpdateInputController implements Controller {
  constructor(private readonly updateInput: UpdateInput, private readonly validation: Validation) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(request.params);

      if (error) {
        return badRequest(error);
      }

      const { id } = request.params as { id: string };

      if (!id) {
        return badRequest(new MissingParamError('id'));
      }

      const body = request.body as CreateInputModel;

      const input = await this.updateInput.updateById(id, body);

      if (!input) {
        return forbidden(new AccessDeniedError(FORBIDDEN_UPDATE_UPDATING_INPUT));
      }

      return ok(input);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
