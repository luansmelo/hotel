import { CategoryModel } from "@/domain/models/Category";

export interface LoadCategoryByIdRepository {
    loadById(string: string): Promise<CategoryModel | null>
}