import { MenuModel } from "@/domain/models/Menu";
import { CreateMenuModel } from "@/domain/usecases/menu/CreateMenu";

export interface CreateMenuRepository {
    create(input: CreateMenuModel): Promise<MenuModel>;
}