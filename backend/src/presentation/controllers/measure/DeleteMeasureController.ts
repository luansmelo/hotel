import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";
import { notFound, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { DeleteMeasureUseCaseContract } from "@/domain/usecases/measure/DeleteMeasure";

export class DeleteMeasureController implements Controller {
  constructor(private readonly deleteMeasure: DeleteMeasureUseCaseContract) { }

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
