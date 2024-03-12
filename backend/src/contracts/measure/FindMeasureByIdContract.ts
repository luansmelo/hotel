import { MeasureModel } from "./CreateMeasureContract";

export interface FindMeasureByIdContract {
  findById(id: string): Promise<MeasureModel | null>;
}

export interface FindMeasureById {
  findById(id: string): Promise<MeasureModel | null>;
}
