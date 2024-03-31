import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenuByIdUseCaseContract {
  loadById(id: string): Promise<MenuModel | null>;
}