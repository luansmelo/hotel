import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/httpRequest";
import { HttpResponse } from "../../protocols/httpResponse";
import { badRequest, ok } from "@/presentation/helpers/httpCodesHelper";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";
import { FindMeasuresParams } from "@/domain/usecases/measure/FindMeasuresParams";
import { Validation } from "@/validation/protocols";


export class FindMeasuresController implements Controller {
  constructor(
    private readonly measures: LoadMeasuresUseCaseContract,
    private readonly validation: Validation
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const params = httpRequest.query as FindMeasuresParams

      const error = this.validation.validate(params)

      if (error) {
        return badRequest(error)
      }

      const measures = await this.measures.loadAll(params);

      return ok(measures);
    } catch (error) {
      return errorHandler(error)
    }
  }
}
