
import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/entities/category/createCategory";

export interface UpdateCategoryUseCaseContract {
    updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<CategoryModel | null>>;
}