import { MeasureModel } from "./CreateMeasureContract";

export interface FindMeasuresContract {
  findAll(): Promise<MeasureModel[] | null>;
}

export interface FindMeasures {
  findAll(): Promise<MeasureModel[] | null>;
}
