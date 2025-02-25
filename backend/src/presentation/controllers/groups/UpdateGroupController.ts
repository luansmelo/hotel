import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_UPDATING_GROUP } from "@/presentation/errors/pt-br";
import { UpdateGroupUseCaseContract } from "@/domain/usecases/group/UpdateGroup";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";

export class UpdateGroupController implements Controller {
  constructor(private readonly group: UpdateGroupUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string };
      const input = httpRequest.body as CreateGroupModel;

      const result = await this.group.updateById(id, input);

      if (!result) {
        return notFound(new GroupNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error);
    }
  }
}
