import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { forbidden, notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { UpdateMeasureUseCaseContract } from "@/domain/usecases/measure/UpdateCategory";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class UpdateMeasureController implements Controller {
  constructor(private readonly updateMeasure: UpdateMeasureUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }
      const input = httpRequest.body as CreateMeasureModel

      const result = await this.updateMeasure.updateById(id, input)

      if (!result) {
        return notFound(new MeasureNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
