import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenusUseCaseContract {
  loadAll(): Promise<MenuModel[] | null>;
}