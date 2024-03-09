import { MeasureModel } from "./createMeasure";

export interface FindMeasureByNameContract {
  findByName(id: string): Promise<MeasureModel | null>;
}
