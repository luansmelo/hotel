import { MeasureModel } from "./createMeasure";

export interface FindMeasuresContract {
  findAll(): Promise<MeasureModel[] | null>;
}

export interface FindMeasures {
  findAll(): Promise<MeasureModel[] | null>;
}
