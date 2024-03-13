import { DeleteMeasure } from "@/contracts";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { notFound, ok } from "@/utils/helpers/httpCodesHelper";
import { MeasureNotFoundError } from "@/utils/errors/MeasureNotFoundError";

export class DeleteMeasureController implements Controller {
  constructor(private readonly deleteMeasure: DeleteMeasure) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params as { id: string }

      const result = await this.deleteMeasure.deleteById(id);

      if (!result) {
        return notFound(new MeasureNotFoundError())
      }

      return ok(result)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
