import { FindGroupById } from "@/contracts/group";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/httpResponse";
import { HttpRequest } from "../protocols/httpRequest";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { GroupNotFoundError } from "@/utils/errors/GroupNotFoundError";

export class FindGroupByIdController implements Controller {
  constructor(private readonly group: FindGroupById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const group = await this.group.findById(id)

      if (!group) {
        return notFound(new GroupNotFoundError())
      }

      return ok(group)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
