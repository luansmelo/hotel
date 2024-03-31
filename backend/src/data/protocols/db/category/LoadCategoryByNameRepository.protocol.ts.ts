import { CategoryModel } from "@/domain/models/Category";

export interface LoadCategoryByNameRepository {
    loadByName(string: string): Promise<CategoryModel | null>
}