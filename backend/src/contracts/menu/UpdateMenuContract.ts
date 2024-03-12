import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";

export interface UpdateMenuContract {
  updateById(id: string, input: Partial<CreateMenuModel>): Promise<void>;
}

export interface UpdateMenu {
  updateById(id: string, input: Partial<CreateMenuModel>): Promise<void>;
}
