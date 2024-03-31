import { FindMeasures, FindMeasuresContract, MeasureModel } from "@/contracts";

export class FindMeasuresUseCase implements FindMeasures {
  constructor(private readonly measures: FindMeasuresContract) {}

  async findAll(): Promise<MeasureModel[] | null> {
    return this.measures.findAll();
  }
}
