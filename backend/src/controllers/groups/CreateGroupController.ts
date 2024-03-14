import { CreateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { badRequest, ok } from "@/utils/helpers/httpCodesHelper";
import { Validation } from "@/validators/sort/SortInputValidator";

export class CreateGroupController implements Controller {
  constructor(private readonly group: CreateGroup, private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const group = await this.group.create({
        ...(httpRequest.body as CreateGroupModel),
      });

      return ok(group)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
