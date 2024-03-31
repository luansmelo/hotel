import { DeleteMeasureRepository } from "@/data/protocols/db/measure/DeleteMeasureRepository.protocol.ts";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { MeasureModel } from "@/domain/models/Measure";
import { DeleteMeasureUseCaseContract } from "@/domain/usecases/measure/DeleteMeasure";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class DeleteMeasureUseCase implements DeleteMeasureUseCaseContract {
  constructor(
    private readonly deleteMeasure: DeleteMeasureRepository,
    private readonly findMeasure: LoadMeasureByIdRepository
  ) {}

  async deleteById(id: string): Promise<MeasureModel> {
    const measure = await this.findMeasure.loadById(id);

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    return this.deleteMeasure.deleteById(measure.id);
  }
}
