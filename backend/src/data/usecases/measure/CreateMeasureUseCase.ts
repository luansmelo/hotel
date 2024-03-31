import {
  CreateMeasure,
  CreateMeasureContract,
  FindMeasureByNameContract,
  MeasureModel,
} from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { MeasureAlreadyExistsError } from "@/presentation/errors/MeasureAlreadyExistsError";

export class CreateMeasureUseCase implements CreateMeasure {
  constructor(
    private readonly createMeasure: CreateMeasureContract,
    private readonly findMeasure: FindMeasureByNameContract
  ) {}

  async create(measureModel: CreateMeasureModel): Promise<MeasureModel> {
    const measure = await this.findMeasure.findByName(measureModel.name);

    if (measure) {
      throw new MeasureAlreadyExistsError("Unidade de medida já cadastrada");
    }

    return this.createMeasure.save(measureModel);
  }
}
