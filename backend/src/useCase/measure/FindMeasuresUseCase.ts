import { FindMeasuresContract, MeasureModel } from "@/contracts";

export class FindMeasuresUseCase {
  constructor(private readonly measures: FindMeasuresContract) {}

  async findAll(): Promise<MeasureModel[] | null> {
    return this.measures.findAll();
  }
}
