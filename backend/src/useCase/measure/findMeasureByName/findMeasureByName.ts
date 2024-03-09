import { FindMeasureByNameContract, MeasureModel } from "@/contracts";

export class FindMeasureByNameUseCase {
  constructor(private readonly findMeasure: FindMeasureByNameContract) {}

  async findByName(name: string): Promise<MeasureModel> {
    return this.findMeasure.findByName(name);
  }
}
