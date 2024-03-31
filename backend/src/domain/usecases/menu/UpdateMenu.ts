import { MenuModel } from "@/domain/models/Menu";
import { CreateCategoryModel } from "../category/CreateCategory";

export interface UpdateMenuUseCaseContract {
    updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<MenuModel | null>>;
}