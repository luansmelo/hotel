
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadGroupByIdUseCaseContract } from "@/domain/usecases/group/LoadGroupById";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";

export class FindGroupByIdController implements Controller {
  constructor(private readonly group: LoadGroupByIdUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const group = await this.group.loadById(id)

      if (!group) {
        return notFound(new GroupNotFoundError())
      }

      return ok(group)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
