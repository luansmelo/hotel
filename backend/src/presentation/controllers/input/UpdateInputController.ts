import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { FORBIDDEN_UPDATE_UPDATING_INPUT } from "@/presentation/errors/pt-br";
  import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { MissingParamError } from "@/presentation/errors/MissingParamError";
import { badRequest, forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { UpdateInputUseCaseContract } from "@/domain/usecases/input/UpdateInput";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";
import { Validation } from "@/validation/protocols";

export class UpdateInputController implements Controller {
  constructor(private readonly updateInput: UpdateInputUseCaseContract, private readonly validation: Validation) { }

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
