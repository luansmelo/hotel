
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_DELETING_GROUP } from "@/presentation/errors/pt-br";
import { DeleteGroupUseCaseContract } from "@/domain/usecases/group/DeleteGroup";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";

export class DeleteGroupController implements Controller {
  constructor(private readonly group: DeleteGroupUseCaseContract) { }

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
