import { UpdateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { GroupNotFoundError } from "@/utils/errors/GroupNotFoundError";

export class UpdateGroupController implements Controller {
  constructor(private readonly group: UpdateGroup) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string };
      const input = httpRequest.body as CreateGroupModel;

      const result = await this.group.updateById(id, input);

      if (!result) {
        return notFound(new GroupNotFoundError());
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error);
    }
  }
}
