import { CategoryModel } from "@/domain/models/Category";

export interface DeleteCategoryRepository {
    deleteById(id: string): Promise<CategoryModel>;
}