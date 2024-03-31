
import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";

export interface CreateMeasureRepository {
    create(input: CreateMeasureModel): Promise<MeasureModel>;
}