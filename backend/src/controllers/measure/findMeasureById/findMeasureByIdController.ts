import { FindMeasureById, MeasureModel } from "@/contracts";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class FindMeasureByIdController {
  constructor(private readonly measure: FindMeasureById) {}

  async findById(id: string): Promise<MeasureModel | null> {
    const measure = await this.measure.findById(id);

    if (!measure) {
      throw new NotFoundError("Unidade de medida não encontrada");
    }

    return measure;
  }
}
