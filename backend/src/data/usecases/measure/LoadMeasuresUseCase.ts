import { LoadMeasuresRepository } from "@/data/protocols/db/measure/LoadMeasuresRepository.protocol";
import { MeasureModel } from "@/domain/models/Measure";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";

export class LoadMeasuresUseCase implements LoadMeasuresUseCaseContract {
  constructor(private readonly measures: LoadMeasuresRepository) {}

  async loadAll(): Promise<MeasureModel[] | null> {
    return this.measures.loadAll();
  }
}
