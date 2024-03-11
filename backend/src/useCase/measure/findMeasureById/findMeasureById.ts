import {
  FindMeasureById,
  FindMeasureByIdContract,
  MeasureModel,
} from "@/contracts";

export class FindMeasureByIdUseCase implements FindMeasureById {
  constructor(private readonly findMeasure: FindMeasureByIdContract) {}

  async findById(id: string): Promise<MeasureModel> {
    return this.findMeasure.findById(id);
  }
}
