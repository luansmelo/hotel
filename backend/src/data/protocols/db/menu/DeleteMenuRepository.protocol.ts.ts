import { MenuModel } from "@/domain/models/Menu";

export interface DeleteMenuRepository {
    deleteById(id: string): Promise<MenuModel>;
}