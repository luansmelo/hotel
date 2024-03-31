import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasuresRepository {
    loadAll(): Promise<MeasureModel[] | null>
}