import { MenuModel } from "@/domain/models/Menu";

export interface CreateMenuModel {
    name: string;
}

export interface CreateMenuUseCaseContract {
    create(input: CreateMenuModel): Promise<MenuModel>;
}
