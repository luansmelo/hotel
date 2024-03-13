import { UpdateMeasure } from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok } from "@/utils/helpers/httpCodesHelper";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

export class UpdateMeasureController implements Controller {
  constructor(private readonly updateMeasure: UpdateMeasure) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as CreateMeasureModel

      const result = await this.updateMeasure.updateById(id, input)

      if (!result) {
        return forbidden(new AccessDeniedError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
