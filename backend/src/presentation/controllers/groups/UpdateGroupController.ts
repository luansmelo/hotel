import { UpdateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { FORBIDDEN_DELETE_UPDATING_GROUP } from "@/utils/errors/pt-br";

export class UpdateGroupController implements Controller {
  constructor(private readonly group: UpdateGroup) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string };
      const input = httpRequest.body as CreateGroupModel;

      const result = await this.group.updateById(id, input);

      if (!result) {
        return forbidden(new AccessDeniedError(FORBIDDEN_DELETE_UPDATING_GROUP));
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error);
    }
  }
}
