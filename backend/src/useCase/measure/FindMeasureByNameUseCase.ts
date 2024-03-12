import {
  FindMeasureByName,
  FindMeasureByNameContract,
  MeasureModel,
} from "@/contracts";

export class FindMeasureByNameUseCase implements FindMeasureByName {
  constructor(private readonly findMeasure: FindMeasureByNameContract) {}

  async findByName(name: string): Promise<MeasureModel> {
    return this.findMeasure.findByName(name);
  }
}
