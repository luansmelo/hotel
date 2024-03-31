import { FindMeasureById, MeasureModel } from "@/contracts";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";

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
