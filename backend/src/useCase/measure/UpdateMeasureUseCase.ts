import {
  FindMeasureByIdContract,
  MeasureModel,
  UpdateMeasureContract,
} from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class UpdateMeasureUseCase {
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
      throw new NotFoundError("Unidade de medida não encontrada");
    }

    return this.updateMeasure.updateById(measure.id, { name: input.name });
  }
}
