import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { CreateMeasureUseCaseContract } from "@/domain/usecases/measure/CreateMeasure";

export class CreateMeasureController implements Controller {
  constructor(private readonly saveMeasure: CreateMeasureUseCaseContract) { }

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
