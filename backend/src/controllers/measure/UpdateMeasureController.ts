import { UpdateMeasure } from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";

export class UpdateMeasureController {
  constructor(private readonly updateMeasure: UpdateMeasure) {}

  async updateById(id: string, input: Partial<CreateMeasureModel>) {
    return this.updateMeasure.updateById(id, input);
  }
}
