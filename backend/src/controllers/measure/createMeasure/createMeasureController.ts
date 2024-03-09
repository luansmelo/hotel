import { CreateMeasure } from "@/contracts";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";

export class CreateMeasureController {
  constructor(private readonly saveMeasure: CreateMeasure) {}

  async create(input: CreateMeasureModel) {
    return this.saveMeasure.create(input);
  }
}
