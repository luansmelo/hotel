import { FindMeasures, MeasureModel } from "@/contracts";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/httpRequest";
import { HttpResponse } from "../protocols/httpResponse";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { ok } from "@/utils/helpers/httpCodesHelper";
export class FindMeasuresController implements Controller {
  constructor(private readonly measures: FindMeasures) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const measures = await this.measures.findAll();

      return ok(measures);
    } catch (error) {
      return errorHandler(error)
    }
  }
}
