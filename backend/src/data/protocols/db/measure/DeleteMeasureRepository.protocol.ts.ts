import { MeasureModel } from "@/domain/models/Measure";

export interface DeleteMeasureRepository {
    deleteById(id: string): Promise<MeasureModel>;
}