import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";


export class FindMeasuresController implements Controller {
  constructor(private readonly measures: LoadMeasuresUseCaseContract) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const measures = await this.measures.loadAll();

      return ok(measures);
    } catch (error) {
      return errorHandler(error)
    }
  }
}
