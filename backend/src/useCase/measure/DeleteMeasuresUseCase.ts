import {
  DeleteMeasure,
  DeleteMeasureContract,
  FindMeasureByIdContract,
  MeasureModel,
} from "@/contracts";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteMeasureUseCase implements DeleteMeasure {
  constructor(
    private readonly deleteMeasure: DeleteMeasureContract,
    private readonly findMeasure: FindMeasureByIdContract
  ) {}

  async deleteById(id: string): Promise<MeasureModel> {
    const measure = await this.findMeasure.findById(id);

    if (!measure) {
      throw new NotFoundError("Unidade de medida não encontrada");
    }

    return this.deleteMeasure.deleteById(measure.id);
  }
}
