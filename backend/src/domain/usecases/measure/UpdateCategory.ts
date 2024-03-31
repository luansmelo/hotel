import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";

export interface UpdateMeasureUseCaseContract {
    updateById(id: string, input: Partial<CreateMeasureModel>): Promise<Partial<MeasureModel | null>>;
}