import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasuresUseCaseContract {
  loadAll(): Promise<MeasureModel[] | null>
}