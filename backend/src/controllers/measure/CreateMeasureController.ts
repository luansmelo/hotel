import { CreateMeasure } from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";

export class CreateMeasureController implements Controller {
  constructor(private readonly saveMeasure: CreateMeasure) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const measure = await this.saveMeasure.create({
        ...httpRequest.body as CreateMeasureModel
      })

      return ok(measure)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
