import { FindMeasureById, MeasureModel } from "@/contracts";
import { MeasureNotFoundError } from "@/utils/errors/MeasureNotFoundError";

export class FindMeasureByIdController {
  constructor(private readonly measure: FindMeasureById) {}

  async findById(id: string): Promise<MeasureModel | null> {
    const measure = await this.measure.findById(id);

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    return measure;
  }
}
