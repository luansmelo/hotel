import { FindGroups } from "@/contracts/group";
import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class FindGroupsController implements Controller {
  constructor(private readonly groups: FindGroups) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const params = httpRequest.params as FindGroupsParams

      const groups = await this.groups.findAll(params)

      return ok(groups)

    } catch (error) {
      return errorHandler(error)
    }
  }
}
