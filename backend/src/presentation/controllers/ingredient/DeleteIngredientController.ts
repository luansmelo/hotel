import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_DELETING_INPUT } from "@/presentation/errors/pt-br";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { DeleteInputUseCaseContract } from "@/domain/usecases/input/DeleteInput";

export class DeleteInputController implements Controller {
  constructor(private readonly input: DeleteInputUseCaseContract) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params as { id: string };

      const result = await this.input.deleteById(id);

      if (!result) {
        return forbidden(new AccessDeniedError(FORBIDDEN_DELETE_DELETING_INPUT));
      }

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
