import { FindGroupById } from "@/contracts/group";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/httpResponse";
import { HttpRequest } from "../../protocols/httpRequest";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
