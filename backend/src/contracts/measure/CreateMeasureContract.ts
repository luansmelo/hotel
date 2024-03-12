import { CreateMeasureModel } from "@/entities/measure/createMeasure";

export interface MeasureModel {
  id?: string;
  name: string;
}

export interface CreateMeasureContract {
  save(input: CreateMeasureModel): Promise<MeasureModel>;
}

export interface CreateMeasure {
  create(input: CreateMeasureModel): Promise<MeasureModel>;
}
