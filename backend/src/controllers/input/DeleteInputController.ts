import { DeleteInput } from "@/contracts/input";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_DELETING_INPUT } from "@/utils/errors/pt-br";

export class DeleteInputController implements Controller {
  constructor(private readonly input: DeleteInput) { }

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
