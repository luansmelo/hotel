import { MenuModel } from "@/domain/models/Menu";

export interface DeleteMenuUseCaseContract {
    deleteById(id: string): Promise<MenuModel>;
}
