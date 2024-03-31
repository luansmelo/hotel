import { MeasureModel } from "@/domain/models/Measure";

export interface LoadMeasureByIdRepository {
    loadById(id: string): Promise<MeasureModel | null>
}