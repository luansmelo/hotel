import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasureByNameRepository {
    loadByName(name: string): Promise<MeasureModel | null>
}