import { LoadMeasureByNameRepository } from "@/data/protocols/db/measure/LoadMeasureByNameRepository.protocol.ts";
import { MeasureModel } from "@/domain/models/Measure";
import { LoadMeasureByNameUseCaseContract } from "@/domain/usecases/measure/LoadMeasureByName";

export class FindMeasureByNameUseCase implements LoadMeasureByNameUseCaseContract {
  constructor(private readonly findMeasure: LoadMeasureByNameRepository) {}

  async loadByName(name: string): Promise<MeasureModel> {
    return this.findMeasure.loadByName(name);
  }
}
