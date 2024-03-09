import { FindMeasureByIdContract, MeasureModel } from "@/contracts";

export class FindMeasureByIdUseCase {
  constructor(private readonly findMeasure: FindMeasureByIdContract) {}

  async findById(id: string): Promise<MeasureModel> {
    return this.findMeasure.findById(id);
  }
}
