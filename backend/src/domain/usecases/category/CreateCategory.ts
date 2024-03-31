import { CategoryModel } from "@/domain/models/Category";

export interface CreateCategoryModel {
    name: string;
}

export interface CreateCategoryUseCaseContract {
    create(input: CreateCategoryModel): Promise<CategoryModel>;
}
