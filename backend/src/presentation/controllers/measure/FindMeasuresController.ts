import { FindMeasures } from "@/contracts";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";


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
