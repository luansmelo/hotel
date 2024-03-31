import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { UpdateMeasureRepository } from "@/data/protocols/db/measure/UpdateMeasureRepository.protocol";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";
import { UpdateMeasureUseCaseContract } from "@/domain/usecases/measure/UpdateCategory";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class UpdateMeasureUseCase implements UpdateMeasureUseCaseContract {
  constructor(
    private readonly updateMeasure: UpdateMeasureRepository,
    private readonly findMeasure: LoadMeasureByIdRepository
  ) { }

  async updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ) {
    const measure = await this.findMeasure.loadById(id);

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    return this.updateMeasure.updateById(measure.id, { name: input.name });
  }
}
