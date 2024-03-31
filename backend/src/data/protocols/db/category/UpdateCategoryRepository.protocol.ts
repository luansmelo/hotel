import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";

export interface UpdateCategoryRepository {
    updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<CategoryModel | null>>;
}