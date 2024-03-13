import { DeleteMenu } from "@/contracts/menu/DeleteMenuContract";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class DeleteMenuController implements Controller {
  constructor(private readonly menu: DeleteMenu) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params as { id: string }

      const result = await this.menu.deleteById(id)

      if (!result) {
        return forbidden(new AccessDeniedError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
