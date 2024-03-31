import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenusRepository {
    loadAll(): Promise<MenuModel[] | null>
}