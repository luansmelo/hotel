
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { MeasureModel } from "@/domain/models/Measure";
import { LoadMeasureByIdUseCaseContract } from "@/domain/usecases/measure/LoadMeasureById";

export class LoadMeasureByIdUseCase implements LoadMeasureByIdUseCaseContract {
  constructor(private readonly findMeasure: LoadMeasureByIdRepository) {}

  async loadById(id: string): Promise<MeasureModel> {
    return this.findMeasure.loadById(id);
  }
}
