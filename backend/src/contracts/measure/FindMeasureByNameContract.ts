import { MeasureModel } from "./CreateMeasureContract";

export interface FindMeasureByNameContract {
  findByName(id: string): Promise<MeasureModel | null>;
}

export interface FindMeasureByName {
  findByName(id: string): Promise<MeasureModel | null>;
}
