import { MeasureModel } from "@/domain/models/Measure";
import { FindMeasuresParams, FindMeasuresResponse } from "@/domain/usecases/measure/FindMeasuresParams";

export interface LoadMeasuresRepository {
    loadAll(params: FindMeasuresParams): Promise<FindMeasuresResponse>
}