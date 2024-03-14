import { FindGroups } from "@/contracts/group";
import { FindGroupsParams } from "@/entities/group/FindGroupsParams";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { badRequest, ok } from "@/utils/helpers/httpCodesHelper";
import { Validation } from "../protocols/validator/ValidationProtocol";

export class FindGroupsController implements Controller {
  constructor(private readonly groups: FindGroups, private readonly validation: Validation) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query as FindGroupsParams

      const error = this.validation.validate(params)

      if (error) {
        return badRequest(error)
      }

      const groups = await this.groups.findAll(params)

      return ok(groups)

    } catch (error) {
      return errorHandler(error)
    }
  }
}
