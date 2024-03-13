import { CreateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateGroupController implements Controller {
  constructor(private readonly group: CreateGroup) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const group = await this.group.create({
        ...(httpRequest.body as CreateGroupModel),
      });

      return ok(group)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
