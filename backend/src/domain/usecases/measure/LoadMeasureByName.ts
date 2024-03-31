import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasureByNameUseCaseContract {
  loadByName(name: string): Promise<MeasureModel | null>
}