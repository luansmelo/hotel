import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasureByIdUseCaseContract {
  loadById(id: string): Promise<MeasureModel | null>
}