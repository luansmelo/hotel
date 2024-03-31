import { MenuModel } from "@/domain/models/Menu";
import { CreateMenuModel } from "@/domain/usecases/menu/CreateMenu";

export interface UpdateMenuRepository {
    updateById(id: string, input: Partial<CreateMenuModel>): Promise<Partial<MenuModel | null>>;
}