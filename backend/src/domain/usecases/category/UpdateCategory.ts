import { CreateCategoryModel } from "./CreateCategory";
import { CategoryModel } from "@/domain/models/Category";

export interface UpdateCategoryUseCaseContract {
    updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<CategoryModel | null>>;
}