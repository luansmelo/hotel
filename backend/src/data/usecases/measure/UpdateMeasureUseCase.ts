import {
  FindMeasureByIdContract,
  MeasureModel,
  UpdateMeasure,
  UpdateMeasureContract,
} from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class UpdateMeasureUseCase implements UpdateMeasure {
  constructor(
    private readonly updateMeasure: UpdateMeasureContract,
    private readonly findMeasure: FindMeasureByIdContract
  ) {}

  async updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ): Promise<MeasureModel> {
    const measure = await this.findMeasure.findById(id);

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    return this.updateMeasure.updateById(measure.id, { name: input.name });
  }
}
