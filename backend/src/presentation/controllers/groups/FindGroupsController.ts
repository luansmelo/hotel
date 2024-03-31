import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadGroupsUseCaseContract } from "@/domain/usecases/group/LoadGroups";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { FindGroupsParams } from "@/domain/usecases/group/FindGroupsParams";

export class LoadGroupsController implements Controller {
  constructor(
    private readonly groups: LoadGroupsUseCaseContract,
    private readonly validation: Validation) { }

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
