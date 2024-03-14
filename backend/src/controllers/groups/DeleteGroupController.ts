import { DeleteGroup } from "@/contracts/group";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_DELETING_GROUP } from "@/utils/errors/pt-br";

export class DeleteGroupController implements Controller {
  constructor(private readonly group: DeleteGroup) { }

  async handle(httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpResquest.params as { id: string }

      const result = await this.group.deleteById(id);

      if (!result) {
        return forbidden(new AccessDeniedError(FORBIDDEN_DELETE_DELETING_GROUP))
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
