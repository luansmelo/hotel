import { MenuModel } from "@/domain/models/Menu";

export interface LoadMenuByNameUseCaseContract {
  loadByName(name: string): Promise<MenuModel | null>;
}