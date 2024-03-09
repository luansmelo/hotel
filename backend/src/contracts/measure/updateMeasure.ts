import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { MeasureModel } from "./createMeasure";

export interface UpdateMeasureContract {
  updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ): Promise<MeasureModel>;
}

export interface UpdateMeasure {
  updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ): Promise<MeasureModel>;
}
