import {
  FindMeasureById,
  FindMeasureByIdContract,
  MeasureModel,
} from "@/contracts";

export class FindMeasureByIdUseCase implements FindMeasureById {
  constructor(private readonly findMeasure: FindMeasureByIdContract) {}

  async findById(id: string): Promise<MeasureModel> {
    console.log(id, "ID");
    return this.findMeasure.findById(id);
  }
}
