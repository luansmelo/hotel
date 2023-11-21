import {
  AddCategoryToMenuContract,
  AddCategoryToMenuInput,
  MenuContract,
  MenuInput,
  MenuProductContract,
  MenuProductInput,
} from "../../dto/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuContract): Promise<void>;
  getById(id: string): Promise<MenuContract | null>;
  getList(): Promise<MenuContract[] | null>;
  addCategoryToMenu(input: AddCategoryToMenuContract): Promise<void>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
}

export interface MenuServiceContract {
  create(input: MenuInput): Promise<void>;
  getById(id: string): Promise<MenuContract | null>;
  getAll(): Promise<MenuContract[] | null>;
  addCategoryToMenu(input: AddCategoryToMenuInput): Promise<void>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
}