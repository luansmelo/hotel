import { FindGroups } from "@/contracts/group";
import { FindGroupsParams } from "@/entities/group/FindGroupsParams";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { Validation } from "../../protocols/validator/ValidationProtocol";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
