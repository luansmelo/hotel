import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenuByIdRepository {
    loadById(id: string): Promise<MenuModel | null>
}