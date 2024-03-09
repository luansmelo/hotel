import { MeasureModel } from "./createMeasure";

export interface FindMeasureByIdContract {
  findById(id: string): Promise<MeasureModel | null>;
}

export interface FindMeasureById {
  findById(id: string): Promise<MeasureModel | null>;
}
