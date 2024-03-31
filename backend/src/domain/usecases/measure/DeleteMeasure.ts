import { MeasureModel } from "@/domain/models/Measure";

export interface DeleteMeasureUseCaseContract {
    deleteById(id: string): Promise<MeasureModel>;
}