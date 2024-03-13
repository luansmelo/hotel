import { FindInputById } from "@/contracts/input";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class FindInputByIdController implements Controller {
  constructor(private readonly input: FindInputById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params as { id: string };

      const result = await this.input.findById(id);
      
      if (!result) {
        return forbidden(new AccessDeniedError());
      }

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
