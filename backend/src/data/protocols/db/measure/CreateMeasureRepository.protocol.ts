import { CategoryModel } from "@/domain/models/Category";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";

export interface CreateMeasureRepository {
    create(input: CreateMeasureModel): Promise<CategoryModel>;
}