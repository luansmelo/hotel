import { FindMeasureById, MeasureModel } from "@/contracts";
import { MeasureNotFoundError } from "@/utils/errors/MeasureNotFoundError";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";

export class FindMeasureByIdController implements Controller {
  constructor(private readonly measure: FindMeasureById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const measure = await this.measure.findById(id);

      if (!measure) {
        return notFound(new MeasureNotFoundError())
      }

      return ok(measure)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
