import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenuByNameRepository {
    loadByName(name: string): Promise<MenuModel | null>
}