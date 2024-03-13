import {
  DeleteMeasure,
  DeleteMeasureContract,
  FindMeasureByIdContract,
  MeasureModel,
} from "@/contracts";
import { MeasureNotFoundError } from "@/utils/errors/MeasureNotFoundError";

export class DeleteMeasureUseCase implements DeleteMeasure {
  constructor(
    private readonly deleteMeasure: DeleteMeasureContract,
    private readonly findMeasure: FindMeasureByIdContract
  ) {}

  async deleteById(id: string): Promise<MeasureModel> {
    const measure = await this.findMeasure.findById(id);

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    return this.deleteMeasure.deleteById(measure.id);
  }
}
