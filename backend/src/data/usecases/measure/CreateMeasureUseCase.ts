import { CreateMeasureRepository } from "@/data/protocols/db/measure/CreateMeasureRepository.protocol";
import { LoadMeasureByNameRepository } from "@/data/protocols/db/measure/LoadMeasureByNameRepository.protocol.ts";
import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureUseCaseContract } from "@/domain/usecases/measure/CreateMeasure";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { MeasureAlreadyExistsError } from "@/presentation/errors/MeasureAlreadyExistsError";

export class CreateMeasureUseCase implements CreateMeasureUseCaseContract {
  constructor(
    private readonly createMeasure: CreateMeasureRepository,
    private readonly findMeasure: LoadMeasureByNameRepository
  ) {}

  async create(measureModel: CreateMeasureModel): Promise<MeasureModel> {
    const measure = await this.findMeasure.loadByName(measureModel.name);

    if (measure) {
      throw new MeasureAlreadyExistsError("Unidade de medida já cadastrada");
    }

    return this.createMeasure.create(measureModel);
  }
}
