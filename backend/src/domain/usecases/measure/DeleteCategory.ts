import { CategoryModel } from "@/domain/models/Category";

export interface DeleteCategoryUseCaseContract {
    deleteById(id: string): Promise<CategoryModel>;
}
