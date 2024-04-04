import { LoadMeasuresRepository } from "@/data/protocols/db/measure/LoadMeasuresRepository.protocol";
import { FindMeasuresParams, FindMeasuresResponse } from "@/domain/usecases/measure/FindMeasuresParams";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";

export class LoadMeasuresUseCase implements LoadMeasuresUseCaseContract {
  constructor(private readonly measures: LoadMeasuresRepository) { }

  async loadAll(params: FindMeasuresParams): Promise<FindMeasuresResponse> {
    return this.measures.loadAll(params);
  }
}
