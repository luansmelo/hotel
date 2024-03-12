import { MeasureModel } from "./CreateMeasureContract";

export interface DeleteMeasureContract {
  deleteById(id: string): Promise<MeasureModel>;
}

export interface DeleteMeasure {
  deleteById(id: string): Promise<MeasureModel>;
}
