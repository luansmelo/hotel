import { MeasureModel } from "@/domain/models/Measure";


export interface CreateMeasureModel {
    name: string;
}

export interface CreateMeasureUseCaseContract {
    create(input: CreateMeasureModel): Promise<MeasureModel>;
}
