import { DeleteGroup } from "@/contracts/group";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { GroupNotFoundError } from "@/utils/errors/GroupNotFoundError";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";

export class DeleteGroupController implements Controller {
  constructor(private readonly group: DeleteGroup) { }

  async handle(httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpResquest.params as { id: string }

      const result = await this.group.deleteById(id);

      if (!result) {
        return notFound(new GroupNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
