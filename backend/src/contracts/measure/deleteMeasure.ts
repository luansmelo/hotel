import { MeasureModel } from "./createMeasure";

export interface DeleteMeasureContract {
  deleteById(id: string): Promise<MeasureModel>;
}

export interface DeleteMeasure {
  deleteById(id: string): Promise<MeasureModel>;
}
