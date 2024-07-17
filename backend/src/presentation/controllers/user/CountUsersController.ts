import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CountTotalUsersUseCaseContract } from "@/domain/usecases/user/CountTotalUsers";

export class CountUsersController implements Controller {
  constructor(private readonly input: CountTotalUsersUseCaseContract) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.input.countTotalUsers();

      return ok(result);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
