import { MenuModel } from "@/domain/models/Menu";
import { FindMenuModel } from "@/domain/usecases/menu/LoadMenu";

export interface LoadMenuRepository {
    loadMenu(param: FindMenuModel): Promise<MenuModel | null>
}