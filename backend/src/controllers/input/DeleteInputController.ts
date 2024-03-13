import { DeleteInput } from "@/contracts/input";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { InputNotFoundError } from "@/utils/errors/InputNotFoundError";

export class DeleteInputController implements Controller {
  constructor(private readonly input: DeleteInput) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params as { id: string };

      const result = await this.input.deleteById(id);

      if (!result) {
        return notFound(new InputNotFoundError());
      }

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
