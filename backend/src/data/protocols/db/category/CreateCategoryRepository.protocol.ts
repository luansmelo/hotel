import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";

export interface CreateCategoryRepository {
    create(input: CreateCategoryModel): Promise<CategoryModel>;
}