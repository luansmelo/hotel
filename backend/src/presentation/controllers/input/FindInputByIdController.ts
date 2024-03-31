import { FindInputById } from "@/contracts/input";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { InputNotFoundError } from "@/utils/errors/InputNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

export class FindInputByIdController implements Controller {
  constructor(private readonly input: FindInputById) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params as { id: string };

      const result = await this.input.findById(id);

      if (!result) {
        return notFound(new InputNotFoundError());
      }

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
