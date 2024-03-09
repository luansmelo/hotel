import { FindMeasures, MeasureModel } from "@/contracts";
export class FindMeasuresController {
  constructor(private readonly measures: FindMeasures) {}

  async findAll(): Promise<MeasureModel[] | null> {
    return this.measures.findAll();
  }
}
