import { CreateGroupModel } from "@/entities/group/createGroup";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { Validation } from "@/validators/sort/SortInputValidator";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CreateGroupUseCaseContract } from "@/domain/usecases/group/CreateGroup";

export class CreateGroupController implements Controller {
  constructor(
    private readonly group: CreateGroupUseCaseContract,
    private readonly validation: Validation) { }

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
