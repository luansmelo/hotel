import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";

export interface CreateMeasureRepository {
    create(input: CreateCategoryModel): Promise<CategoryModel>;
}